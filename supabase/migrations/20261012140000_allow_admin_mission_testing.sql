-- Allow the site owner/admin account to use missions as a normal viewer for testing.
-- This does not change standard watch earning rates, admin permissions, or other users.
create or replace function public.join_missions(p_period_type text)
returns jsonb language plpgsql security definer set search_path=''
as $function$
declare
 v_user_id uuid:=auth.uid(); v_user public.users%rowtype;
 v_period_start timestamptz; v_period_end timestamptz; v_joined_at timestamptz;
begin
 if v_user_id is null then raise exception 'not_authenticated' using errcode='42501'; end if;
 if p_period_type not in ('daily','weekly') then raise exception 'invalid_period_type' using errcode='22023'; end if;
 select * into v_user from public.users where id=v_user_id for update;
 if not found or coalesce(v_user.is_blocked,false) or not coalesce(v_user.profile_complete,false)
   or v_user.twitch_user_id is null
 then raise exception 'profile_not_eligible' using errcode='42501'; end if;
 if p_period_type='daily' then
  v_period_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_period_end:=v_period_start+interval '1 day';
 else
  v_period_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_period_end:=v_period_start+interval '1 week';
 end if;
 insert into public.mission_period_participants(user_id,period_type,period_start)
 values(v_user_id,p_period_type,v_period_start) on conflict(user_id,period_type,period_start) do nothing;
 select joined_at into v_joined_at from public.mission_period_participants
 where user_id=v_user_id and period_type=p_period_type and period_start=v_period_start;
 perform private.refresh_mission_rewards(v_user_id);
 return jsonb_build_object('ok',true,'enrolled',true,'period_type',p_period_type,
   'period_start',v_period_start,'period_end',v_period_end,'joined_at',v_joined_at);
end;
$function$;
revoke all on function public.join_missions(text) from public,anon;
grant execute on function public.join_missions(text) to authenticated;

create or replace function private.refresh_mission_rewards(p_user_id uuid)
returns void language plpgsql security definer set search_path=''
as $function$
declare
 v_user public.users%rowtype; v_sys public.system_config%rowtype; v_cfg public.fnc_settings%rowtype;
 m public.missions%rowtype; v_period_start timestamptz; v_period_end timestamptz;
 v_minutes integer; v_xp bigint; v_fnc bigint; v_daily_used bigint; v_claim_id uuid; v_joined_at timestamptz;
begin
 if p_user_id is null then return; end if;
 select * into v_user from public.users where id=p_user_id for update;
 if not found or coalesce(v_user.is_blocked,false) or not coalesce(v_user.profile_complete,false)
    or v_user.twitch_user_id is null
 then return; end if;
 select * into v_sys from public.system_config where id=true;
 select * into v_cfg from public.fnc_settings where id=1;
 if not coalesce(v_sys.xp_enabled,false) or not coalesce(v_sys.points_enabled,false) or not coalesce(v_cfg.enabled,false)
 then return; end if;

 for m in select * from public.missions where active=true order by display_order,id loop
  if m.period_type='daily' then
   v_period_start:=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
   v_period_end:=v_period_start+interval '1 day';
  else
   v_period_start:=date_trunc('week',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
   v_period_end:=v_period_start+interval '1 week';
  end if;

  select p.joined_at into v_joined_at
  from public.mission_period_participants p
  where p.user_id=p_user_id and p.period_type=m.period_type and p.period_start=v_period_start;
  if v_joined_at is null then continue; end if;

  select count(distinct date_trunc('minute',t.tick_minute))::integer into v_minutes
  from public.fnc_reward_ticks t join public.watch_sessions ws on ws.id=t.session_id
  where t.user_id=p_user_id and ws.platform='twitch'
    and t.tick_minute>=greatest(v_period_start,v_joined_at)
    and t.tick_minute<least(v_period_end,now()+interval '1 minute');

  if coalesce(v_minutes,0)<m.goal_minutes then continue; end if;
  v_xp:=m.xp_reward; v_fnc:=m.fnc_reward;
  if coalesce(v_cfg.daily_fnc_limit,0)>0 and v_fnc>0 then
   select coalesce(sum(t.amount),0)::bigint into v_daily_used from public.transactions t
   where t.user_id=p_user_id and t.type='watch_fnc'
     and t.created_at>=date_trunc('day',now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
   v_fnc:=least(v_fnc,greatest(0,v_cfg.daily_fnc_limit::bigint-v_daily_used));
  end if;
  v_claim_id:=null;
  insert into public.mission_claims(user_id,mission_id,period_start,period_end,progress_minutes,xp_awarded,fnc_awarded)
  values(p_user_id,m.id,v_period_start,v_period_end,v_minutes,v_xp,v_fnc)
  on conflict(user_id,mission_id,period_start) do nothing returning id into v_claim_id;
  if v_claim_id is null then continue; end if;

  update public.users set xp=xp+v_xp,monthly_xp=monthly_xp+v_xp,fnc_points=fnc_points+v_fnc,
    total_fnc_earned=total_fnc_earned+v_fnc,updated_at=now() where id=p_user_id;
  if v_xp>0 then
   insert into public.transactions(user_id,type,amount,source,metadata,platform)
   values(p_user_id,'watch_xp',v_xp,'mission_reward',
     jsonb_build_object('mission_id',m.id,'period_start',v_period_start,'period_end',v_period_end,'verified_twitch_minutes',v_minutes),'twitch');
  end if;
  if v_fnc>0 then
   insert into public.transactions(user_id,type,amount,source,metadata,platform)
   values(p_user_id,'watch_fnc',v_fnc,'mission_reward',
     jsonb_build_object('mission_id',m.id,'period_start',v_period_start,'period_end',v_period_end,'verified_twitch_minutes',v_minutes),'twitch');
  end if;
 end loop;
end;
$function$;
revoke all on function private.refresh_mission_rewards(uuid) from public,anon,authenticated;
