-- Keep public viewer profile mission progress aligned with separate daily/weekly enrollment.
create or replace function public.get_viewer_missions(p_twitch_username text)
returns jsonb
language plpgsql
security definer
set search_path=''
as $function$
declare
  v_user public.users%rowtype;
  v_daily_start timestamptz;
  v_weekly_start timestamptz;
  v_daily_joined timestamptz;
  v_weekly_joined timestamptz;
  v_result jsonb;
begin
  if p_twitch_username is null or length(trim(p_twitch_username)) < 1 or length(trim(p_twitch_username)) > 25 then
    return jsonb_build_object('ok',false,'error','invalid_username');
  end if;

  select u.* into v_user
  from public.users u
  where lower(u.twitch_username)=lower(trim(p_twitch_username))
    and coalesce(u.is_blocked,false)=false
    and coalesce(u.profile_complete,false)=true
  limit 1;

  if not found then
    return jsonb_build_object('ok',false,'error','profile_not_found');
  end if;

  v_daily_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_weekly_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';

  select joined_at into v_daily_joined
  from public.mission_period_participants
  where user_id=v_user.id and period_type='daily' and period_start=v_daily_start;

  select joined_at into v_weekly_joined
  from public.mission_period_participants
  where user_id=v_user.id and period_type='weekly' and period_start=v_weekly_start;

  select jsonb_build_object(
    'ok',true,
    'timezone','Africa/Algiers',
    'enrolled',v_daily_joined is not null or v_weekly_joined is not null,
    'daily_joined',v_daily_joined is not null,
    'weekly_joined',v_weekly_joined is not null,
    'daily_joined_at',v_daily_joined,
    'weekly_joined_at',v_weekly_joined,
    'missions',coalesce(jsonb_agg(jsonb_build_object(
      'id',m.id,
      'title',m.title,
      'description',m.description,
      'period_type',m.period_type,
      'goal_minutes',m.goal_minutes,
      'xp_reward',m.xp_reward,
      'fnc_reward',m.fnc_reward,
      'progress_minutes',coalesce(p.progress_minutes,0),
      'completed',c.id is not null,
      'xp_awarded',coalesce(c.xp_awarded,0),
      'fnc_awarded',coalesce(c.fnc_awarded,0),
      'period_start',p.period_start,
      'period_end',p.period_end,
      'joined',case when m.period_type='daily' then v_daily_joined is not null else v_weekly_joined is not null end
    ) order by m.display_order,m.id),'[]'::jsonb)
  ) into v_result
  from public.missions m
  left join lateral (
    select
      case when m.period_type='daily' then v_daily_start else v_weekly_start end as period_start,
      case when m.period_type='daily' then v_daily_start+interval '1 day' else v_weekly_start+interval '1 week' end as period_end,
      (select count(distinct date_trunc('minute',t.tick_minute))::integer
       from public.fnc_reward_ticks t
       join public.watch_sessions ws on ws.id=t.session_id
       where t.user_id=v_user.id
         and ws.platform='twitch'
         and (
           (m.period_type='daily' and v_daily_joined is not null and t.tick_minute>=greatest(v_daily_start,v_daily_joined))
           or
           (m.period_type='weekly' and v_weekly_joined is not null and t.tick_minute>=greatest(v_weekly_start,v_weekly_joined))
         )
         and t.tick_minute<now()+interval '1 minute'
      ) as progress_minutes
  ) p on true
  left join public.mission_claims c
    on c.user_id=v_user.id and c.mission_id=m.id and c.period_start=p.period_start
  where m.active=true;

  return coalesce(v_result,jsonb_build_object('ok',true,'enrolled',false,'missions','[]'::jsonb));
end;
$function$;

revoke all on function public.get_viewer_missions(text) from public;
grant execute on function public.get_viewer_missions(text) to anon,authenticated;
