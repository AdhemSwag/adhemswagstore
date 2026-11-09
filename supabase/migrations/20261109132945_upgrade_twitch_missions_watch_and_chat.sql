-- Expand Twitch missions to verified watch time, active chat messages and distinct watch days.
-- Existing watch-only mission claims remain intact; old active objectives are retired, not deleted.
alter table public.missions
  add column if not exists metric_type text not null default 'watch_minutes',
  add column if not exists goal_count integer not null default 0;
alter table public.mission_claims add column if not exists progress_count integer not null default 0;
alter table public.missions drop constraint if exists missions_metric_type_check;
alter table public.missions add constraint missions_metric_type_check check (metric_type in ('watch_minutes','chat_messages','watch_days'));
alter table public.missions drop constraint if exists missions_goal_count_check;
alter table public.missions add constraint missions_goal_count_check check (goal_count >= 0);
create index if not exists chat_activity_twitch_user_created_idx on public.chat_activity(user_id,created_at) where platform='twitch';

update public.missions set active=false,updated_at=now() where active=true;
insert into public.missions
  (id,title,description,period_type,metric_type,goal_minutes,goal_count,xp_reward,fnc_reward,active,display_order)
values
  ('daily_watch_30','Daily Watch Check-in','Watch 30 verified minutes on AdhemSwag’s Twitch stream today.','daily','watch_minutes',30,0,50,50,true,10),
  ('daily_watch_60','Daily Watch Streak','Reach 60 verified Twitch watch minutes today.','daily','watch_minutes',60,0,75,75,true,20),
  ('daily_chat_5','Chat Regular','Send 5 qualifying messages in AdhemSwag’s Twitch chat today. Spam, bots and messages inside the anti-spam cooldown do not count.','daily','chat_messages',1,5,50,50,true,30),
  ('weekly_watch_days_3','Weekly Regular','Watch AdhemSwag live on 3 different days this week.','weekly','watch_days',1,3,150,150,true,40),
  ('weekly_watch_300','Weekly Watch Goal','Reach 5 hours (300 verified minutes) of Twitch watch time this week.','weekly','watch_minutes',300,0,200,200,true,50),
  ('weekly_chat_30','Community Voice','Send 30 qualifying messages in AdhemSwag’s Twitch chat this week. Spam, bots and messages inside the anti-spam cooldown do not count.','weekly','chat_messages',1,30,150,150,true,60)
on conflict (id) do update set title=excluded.title,description=excluded.description,period_type=excluded.period_type,
  metric_type=excluded.metric_type,goal_minutes=excluded.goal_minutes,goal_count=excluded.goal_count,
  xp_reward=excluded.xp_reward,fnc_reward=excluded.fnc_reward,active=excluded.active,
  display_order=excluded.display_order,updated_at=now();

CREATE OR REPLACE FUNCTION private.refresh_mission_rewards(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user public.users%rowtype; v_sys public.system_config%rowtype; v_cfg public.fnc_settings%rowtype;
  m public.missions%rowtype; v_period_start timestamptz; v_period_end timestamptz; v_joined_at timestamptz;
  v_minutes integer; v_count integer; v_goal integer; v_progress integer;
  v_xp bigint; v_fnc bigint; v_daily_used bigint; v_claim_id uuid;
begin
  if p_user_id is null then return; end if;
  select * into v_user from public.users where id=p_user_id for update;
  if not found or coalesce(v_user.is_blocked,false) or not coalesce(v_user.profile_complete,false)
    or v_user.twitch_user_id is null or exists(select 1 from public.admin_users a where a.user_id=p_user_id) then return; end if;
  select * into v_sys from public.system_config where id=true;
  select * into v_cfg from public.fnc_settings where id=1;
  if not coalesce(v_sys.xp_enabled,false) or not coalesce(v_sys.points_enabled,false) or not coalesce(v_cfg.enabled,false) then return; end if;

  for m in select * from public.missions where active=true order by display_order,id loop
    if m.period_type='daily' then
      v_period_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
      v_period_end:=v_period_start+interval '1 day';
    else
      v_period_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
      v_period_end:=v_period_start+interval '1 week';
    end if;
    select p.joined_at into v_joined_at from public.mission_period_participants p
      where p.user_id=p_user_id and p.period_type=m.period_type and p.period_start=v_period_start;
    if v_joined_at is null then continue; end if;

    select count(distinct date_trunc('minute',t.tick_minute))::integer into v_minutes
    from public.fnc_reward_ticks t join public.watch_sessions ws on ws.id=t.session_id
    where t.user_id=p_user_id and ws.platform='twitch'
      and t.tick_minute>=greatest(v_period_start,v_joined_at) and t.tick_minute<least(v_period_end,now()+interval '1 minute');

    if m.metric_type='chat_messages' then
      select count(*)::integer into v_count from public.chat_activity ca
      where ca.user_id=p_user_id and ca.platform='twitch'
        and ca.created_at>=greatest(v_period_start,v_joined_at) and ca.created_at<least(v_period_end,now()+interval '1 minute');
      v_goal:=m.goal_count;
    elsif m.metric_type='watch_days' then
      select count(distinct (t.tick_minute at time zone 'Africa/Algiers')::date)::integer into v_count
      from public.fnc_reward_ticks t join public.watch_sessions ws on ws.id=t.session_id
      where t.user_id=p_user_id and ws.platform='twitch'
        and t.tick_minute>=greatest(v_period_start,v_joined_at) and t.tick_minute<least(v_period_end,now()+interval '1 minute');
      v_goal:=m.goal_count;
    else
      v_count:=coalesce(v_minutes,0); v_goal:=m.goal_minutes;
    end if;
    v_progress:=coalesce(v_count,0);
    if v_progress<v_goal then continue; end if;

    v_xp:=m.xp_reward; v_fnc:=m.fnc_reward;
    if coalesce(v_cfg.daily_fnc_limit,0)>0 and v_fnc>0 then
      select coalesce(sum(t.amount),0)::bigint into v_daily_used from public.transactions t
      where t.user_id=p_user_id and t.type='watch_fnc'
        and t.created_at>=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
      v_fnc:=least(v_fnc,greatest(0,v_cfg.daily_fnc_limit::bigint-v_daily_used));
    end if;
    v_claim_id:=null;
    insert into public.mission_claims(user_id,mission_id,period_start,period_end,progress_minutes,progress_count,xp_awarded,fnc_awarded)
    values(p_user_id,m.id,v_period_start,v_period_end,coalesce(v_minutes,0),v_progress,v_xp,v_fnc)
    on conflict(user_id,mission_id,period_start) do nothing returning id into v_claim_id;
    if v_claim_id is null then continue; end if;

    update public.users set xp=xp+v_xp,monthly_xp=monthly_xp+v_xp,fnc_points=fnc_points+v_fnc,
      total_fnc_earned=total_fnc_earned+v_fnc,updated_at=now() where id=p_user_id;
    if v_xp>0 then
      insert into public.transactions(user_id,type,amount,source,metadata,platform)
      values(p_user_id,'watch_xp',v_xp,'mission_reward',jsonb_build_object('mission_id',m.id,'period_start',v_period_start,
        'period_end',v_period_end,'metric_type',m.metric_type,'progress_value',v_progress,'goal_value',v_goal,
        'verified_twitch_minutes',coalesce(v_minutes,0)),'twitch');
    end if;
    if v_fnc>0 then
      insert into public.transactions(user_id,type,amount,source,metadata,platform)
      values(p_user_id,'watch_fnc',v_fnc,'mission_reward',jsonb_build_object('mission_id',m.id,'period_start',v_period_start,
        'period_end',v_period_end,'metric_type',m.metric_type,'progress_value',v_progress,'goal_value',v_goal,
        'verified_twitch_minutes',coalesce(v_minutes,0)),'twitch');
    end if;
  end loop;
end;
$function$

CREATE OR REPLACE FUNCTION private.on_twitch_mission_chat_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if new.platform='twitch' then perform private.refresh_mission_rewards(new.user_id); end if;
  return new;
end;
$function$

CREATE OR REPLACE FUNCTION public.get_my_missions()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid:=auth.uid(); v_result jsonb; v_daily_start timestamptz; v_weekly_start timestamptz;
  v_daily_joined timestamptz; v_weekly_joined timestamptz;
begin
  if v_user_id is null then raise exception 'not_authenticated' using errcode='42501'; end if;
  v_daily_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_weekly_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  select joined_at into v_daily_joined from public.mission_period_participants where user_id=v_user_id and period_type='daily' and period_start=v_daily_start;
  select joined_at into v_weekly_joined from public.mission_period_participants where user_id=v_user_id and period_type='weekly' and period_start=v_weekly_start;
  perform private.refresh_mission_rewards(v_user_id);

  select jsonb_build_object('ok',true,'timezone','Africa/Algiers',
    'daily_joined',v_daily_joined is not null,'weekly_joined',v_weekly_joined is not null,
    'daily_joined_at',v_daily_joined,'weekly_joined_at',v_weekly_joined,
    'missions',coalesce(jsonb_agg(jsonb_build_object(
      'id',m.id,'title',m.title,'description',m.description,'period_type',m.period_type,'metric_type',m.metric_type,
      'goal_minutes',m.goal_minutes,'goal_count',m.goal_count,'progress_minutes',coalesce(p.progress_minutes,0),
      'progress_count',coalesce(p.progress_count,0),'xp_reward',m.xp_reward,'fnc_reward',m.fnc_reward,
      'completed',c.id is not null,'xp_awarded',coalesce(c.xp_awarded,0),'fnc_awarded',coalesce(c.fnc_awarded,0),
      'period_start',p.period_start,'period_end',p.period_end,'joined',p.joined_at is not null
    ) order by m.display_order,m.id),'[]'::jsonb)) into v_result
  from public.missions m
  left join lateral (
    select x.*,
      case when x.joined_at is null then 0 else (
        select count(distinct date_trunc('minute',t.tick_minute))::integer from public.fnc_reward_ticks t
        join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user_id and ws.platform='twitch'
          and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute')
      ) end as progress_minutes,
      case when x.joined_at is null then 0
        when m.metric_type='chat_messages' then (
          select count(*)::integer from public.chat_activity ca where ca.user_id=v_user_id and ca.platform='twitch'
            and ca.created_at>=greatest(x.period_start,x.joined_at) and ca.created_at<least(x.period_end,now()+interval '1 minute'))
        when m.metric_type='watch_days' then (
          select count(distinct (t.tick_minute at time zone 'Africa/Algiers')::date)::integer from public.fnc_reward_ticks t
          join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user_id and ws.platform='twitch'
            and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute'))
        else (
          select count(distinct date_trunc('minute',t.tick_minute))::integer from public.fnc_reward_ticks t
          join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user_id and ws.platform='twitch'
            and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute'))
      end as progress_count
    from (select case when m.period_type='daily' then v_daily_start else v_weekly_start end as period_start,
      case when m.period_type='daily' then v_daily_start+interval '1 day' else v_weekly_start+interval '1 week' end as period_end,
      case when m.period_type='daily' then v_daily_joined else v_weekly_joined end as joined_at) x
  ) p on true
  left join public.mission_claims c on c.user_id=v_user_id and c.mission_id=m.id and c.period_start=p.period_start
  where m.active=true;
  return coalesce(v_result,jsonb_build_object('ok',true,'missions','[]'::jsonb));
end;
$function$

CREATE OR REPLACE FUNCTION public.get_viewer_missions(p_twitch_username text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user public.users%rowtype; v_daily_start timestamptz; v_weekly_start timestamptz;
  v_daily_joined timestamptz; v_weekly_joined timestamptz; v_result jsonb;
begin
  if p_twitch_username is null or length(trim(p_twitch_username))<1 or length(trim(p_twitch_username))>25 then
    return jsonb_build_object('ok',false,'error','invalid_username');
  end if;
  select u.* into v_user from public.users u where lower(u.twitch_username)=lower(trim(p_twitch_username))
    and coalesce(u.is_blocked,false)=false and coalesce(u.profile_complete,false)=true
    and not exists(select 1 from public.admin_users a where a.user_id=u.id) limit 1;
  if not found then return jsonb_build_object('ok',false,'error','profile_not_found'); end if;

  v_daily_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_weekly_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  select joined_at into v_daily_joined from public.mission_period_participants where user_id=v_user.id and period_type='daily' and period_start=v_daily_start;
  select joined_at into v_weekly_joined from public.mission_period_participants where user_id=v_user.id and period_type='weekly' and period_start=v_weekly_start;

  select jsonb_build_object('ok',true,'timezone','Africa/Algiers',
    'enrolled',v_daily_joined is not null or v_weekly_joined is not null,
    'daily_joined',v_daily_joined is not null,'weekly_joined',v_weekly_joined is not null,
    'daily_joined_at',v_daily_joined,'weekly_joined_at',v_weekly_joined,
    'missions',coalesce(jsonb_agg(jsonb_build_object(
      'id',m.id,'title',m.title,'description',m.description,'period_type',m.period_type,'metric_type',m.metric_type,
      'goal_minutes',m.goal_minutes,'goal_count',m.goal_count,'progress_minutes',coalesce(p.progress_minutes,0),
      'progress_count',coalesce(p.progress_count,0),'xp_reward',m.xp_reward,'fnc_reward',m.fnc_reward,
      'completed',c.id is not null,'xp_awarded',coalesce(c.xp_awarded,0),'fnc_awarded',coalesce(c.fnc_awarded,0),
      'period_start',p.period_start,'period_end',p.period_end,'joined',p.joined_at is not null
    ) order by m.display_order,m.id),'[]'::jsonb)) into v_result
  from public.missions m
  left join lateral (
    select x.*,
      case when x.joined_at is null then 0 else (
        select count(distinct date_trunc('minute',t.tick_minute))::integer from public.fnc_reward_ticks t
        join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user.id and ws.platform='twitch'
          and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute')
      ) end as progress_minutes,
      case when x.joined_at is null then 0
        when m.metric_type='chat_messages' then (
          select count(*)::integer from public.chat_activity ca where ca.user_id=v_user.id and ca.platform='twitch'
            and ca.created_at>=greatest(x.period_start,x.joined_at) and ca.created_at<least(x.period_end,now()+interval '1 minute'))
        when m.metric_type='watch_days' then (
          select count(distinct (t.tick_minute at time zone 'Africa/Algiers')::date)::integer from public.fnc_reward_ticks t
          join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user.id and ws.platform='twitch'
            and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute'))
        else (
          select count(distinct date_trunc('minute',t.tick_minute))::integer from public.fnc_reward_ticks t
          join public.watch_sessions ws on ws.id=t.session_id where t.user_id=v_user.id and ws.platform='twitch'
            and t.tick_minute>=greatest(x.period_start,x.joined_at) and t.tick_minute<least(x.period_end,now()+interval '1 minute'))
      end as progress_count
    from (select case when m.period_type='daily' then v_daily_start else v_weekly_start end as period_start,
      case when m.period_type='daily' then v_daily_start+interval '1 day' else v_weekly_start+interval '1 week' end as period_end,
      case when m.period_type='daily' then v_daily_joined else v_weekly_joined end as joined_at) x
  ) p on true
  left join public.mission_claims c on c.user_id=v_user.id and c.mission_id=m.id and c.period_start=p.period_start
  where m.active=true;
  return coalesce(v_result,jsonb_build_object('ok',true,'enrolled',false,'missions','[]'::jsonb));
end;
$function$


revoke all on function private.refresh_mission_rewards(uuid) from public,anon,authenticated;
revoke all on function private.on_twitch_mission_chat_activity() from public,anon,authenticated;
drop trigger if exists trg_twitch_mission_chat_activity on public.chat_activity;
create trigger trg_twitch_mission_chat_activity after insert on public.chat_activity
for each row execute function private.on_twitch_mission_chat_activity();
revoke all on function public.get_my_missions() from public,anon;
grant execute on function public.get_my_missions() to authenticated;
revoke all on function public.get_viewer_missions(text) from public;
grant execute on function public.get_viewer_missions(text) to anon,authenticated;
