CREATE OR REPLACE FUNCTION private.refresh_mission_rewards(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user public.users%rowtype;
  v_sys public.system_config%rowtype;
  v_cfg public.fnc_settings%rowtype;
  m public.missions%rowtype;
  v_period_start timestamptz;
  v_period_end timestamptz;
  v_minutes integer;
  v_xp bigint;
  v_fnc bigint;
  v_daily_used bigint;
  v_claim_id uuid;
begin
  if p_user_id is null then return; end if;

  select * into v_user from public.users where id=p_user_id for update;
  if not found
     or coalesce(v_user.is_blocked,false)
     or not coalesce(v_user.profile_complete,false)
     or v_user.twitch_user_id is null
     or exists (select 1 from public.admin_users a where a.user_id=p_user_id)
  then return; end if;

  select * into v_sys from public.system_config where id=true;
  select * into v_cfg from public.fnc_settings where id=1;

  -- Mission rewards never bypass the existing global XP/FNC switches.
  if not coalesce(v_sys.xp_enabled,false)
     or not coalesce(v_sys.points_enabled,false)
     or not coalesce(v_cfg.enabled,false)
  then return; end if;

  for m in
    select * from public.missions
    where active=true
    order by display_order, id
  loop
    if m.period_type='daily' then
      v_period_start := date_trunc('day', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
      v_period_end := v_period_start + interval '1 day';
    else
      v_period_start := date_trunc('week', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
      v_period_end := v_period_start + interval '1 week';
    end if;

    select count(distinct date_trunc('minute', t.tick_minute))::integer
      into v_minutes
    from public.fnc_reward_ticks t
    join public.watch_sessions ws on ws.id=t.session_id
    where t.user_id=p_user_id
      and ws.platform='twitch'
      and t.tick_minute >= v_period_start
      and t.tick_minute < least(v_period_end, now() + interval '1 minute')
      and true;

    if coalesce(v_minutes,0) < m.goal_minutes then continue; end if;

    v_xp := m.xp_reward;
    v_fnc := m.fnc_reward;

    -- Respect the existing daily FNC cap. A zero cap retains the site's
    -- existing meaning: no configured cap.
    if coalesce(v_cfg.daily_fnc_limit,0) > 0 and v_fnc > 0 then
      select coalesce(sum(t.amount),0)::bigint into v_daily_used
      from public.transactions t
      where t.user_id=p_user_id
        and t.type='watch_fnc'
        and t.created_at >= date_trunc('day', now());
      v_fnc := least(v_fnc, greatest(0, v_cfg.daily_fnc_limit::bigint-v_daily_used));
    end if;

    v_claim_id := null;
    insert into public.mission_claims
      (user_id,mission_id,period_start,period_end,progress_minutes,xp_awarded,fnc_awarded)
    values
      (p_user_id,m.id,v_period_start,v_period_end,v_minutes,v_xp,v_fnc)
    on conflict (user_id,mission_id,period_start) do nothing
    returning id into v_claim_id;

    if v_claim_id is null then continue; end if;

    update public.users
    set xp=xp+v_xp,
        monthly_xp=monthly_xp+v_xp,
        fnc_points=fnc_points+v_fnc,
        total_fnc_earned=total_fnc_earned+v_fnc,
        updated_at=now()
    where id=p_user_id;

    if v_xp > 0 then
      insert into public.transactions(user_id,type,amount,source,metadata,platform)
      values (p_user_id,'watch_xp',v_xp,'mission_reward',
        jsonb_build_object('mission_id',m.id,'period_start',v_period_start,'period_end',v_period_end,'verified_twitch_minutes',v_minutes),
        'twitch');
    end if;

    if v_fnc > 0 then
      insert into public.transactions(user_id,type,amount,source,metadata,platform)
      values (p_user_id,'watch_fnc',v_fnc,'mission_reward',
        jsonb_build_object('mission_id',m.id,'period_start',v_period_start,'period_end',v_period_end,'verified_twitch_minutes',v_minutes),
        'twitch');
    end if;
  end loop;
end;
$function$
;
CREATE OR REPLACE FUNCTION public.get_my_missions()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_result jsonb;
begin
  if v_user_id is null then
    raise exception 'not_authenticated' using errcode='42501';
  end if;

  perform private.refresh_mission_rewards(v_user_id);

  select jsonb_build_object(
    'ok',true,
    'timezone','Africa/Algiers',
    'missions',coalesce(jsonb_agg(
      jsonb_build_object(
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
        'period_end',p.period_end
      ) order by m.display_order,m.id
    ),'[]'::jsonb)
  ) into v_result
  from public.missions m
  left join lateral (
    select
      case when m.period_type='daily'
        then date_trunc('day', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers'
        else date_trunc('week', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers'
      end as period_start,
      case when m.period_type='daily'
        then (date_trunc('day', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers') + interval '1 day'
        else (date_trunc('week', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers') + interval '1 week'
      end as period_end,
      (
        select count(distinct date_trunc('minute', t.tick_minute))::integer
        from public.fnc_reward_ticks t
        join public.watch_sessions ws on ws.id=t.session_id
        where t.user_id=v_user_id and ws.platform='twitch'
          and t.tick_minute >= (
            case when m.period_type='daily'
              then date_trunc('day', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers'
              else date_trunc('week', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers'
            end)
          and t.tick_minute < now() + interval '1 minute'
          and true
      ) as progress_minutes
  ) p on true
  left join public.mission_claims c
    on c.user_id=v_user_id and c.mission_id=m.id and c.period_start=p.period_start
  where m.active=true;

  return coalesce(v_result,jsonb_build_object('ok',true,'missions','[]'::jsonb));
end;
$function$
;
