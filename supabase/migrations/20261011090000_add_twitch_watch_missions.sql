create table if not exists public.missions (
  id text primary key,
  title text not null,
  description text not null,
  period_type text not null check (period_type in ('daily','weekly')),
  goal_minutes integer not null check (goal_minutes > 0),
  xp_reward bigint not null default 0 check (xp_reward >= 0),
  fnc_reward bigint not null default 0 check (fnc_reward >= 0),
  active boolean not null default true,
  display_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  mission_id text not null references public.missions(id),
  period_start timestamptz not null,
  period_end timestamptz not null,
  progress_minutes integer not null check (progress_minutes >= 0),
  xp_awarded bigint not null default 0 check (xp_awarded >= 0),
  fnc_awarded bigint not null default 0 check (fnc_awarded >= 0),
  created_at timestamptz not null default now(),
  unique (user_id, mission_id, period_start)
);

alter table public.missions enable row level security;
alter table public.mission_claims enable row level security;
revoke all on public.missions, public.mission_claims from anon, authenticated;
grant all on public.missions, public.mission_claims to service_role;

create index if not exists mission_claims_user_period_idx
  on public.mission_claims (user_id, period_start desc);
create index if not exists fnc_reward_ticks_user_minute_idx
  on public.fnc_reward_ticks (user_id, tick_minute);

insert into public.missions
  (id,title,description,period_type,goal_minutes,xp_reward,fnc_reward,active,display_order)
values
  ('twitch_daily_30','Daily Twitch Watch','Watch at least 30 verified minutes on Twitch today.','daily',30,10,1,true,10),
  ('twitch_weekly_180','Weekly Twitch Watch','Reach 180 verified Twitch watch minutes this week.','weekly',180,50,5,true,20)
on conflict (id) do update set
  title=excluded.title,
  description=excluded.description,
  period_type=excluded.period_type,
  goal_minutes=excluded.goal_minutes,
  xp_reward=excluded.xp_reward,
  fnc_reward=excluded.fnc_reward,
  active=excluded.active,
  display_order=excluded.display_order,
  updated_at=now();

create or replace function private.refresh_mission_rewards(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
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
      and (coalesce(t.xp_awarded,0)>0 or coalesce(t.fnc_awarded,0)>0);

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
$function$;

revoke all on function private.refresh_mission_rewards(uuid) from public, anon, authenticated;

create or replace function private.on_twitch_mission_tick()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if exists (
    select 1 from public.watch_sessions ws
    where ws.id=new.session_id and ws.platform='twitch'
  ) then
    perform private.refresh_mission_rewards(new.user_id);
  end if;
  return new;
end;
$function$;

revoke all on function private.on_twitch_mission_tick() from public, anon, authenticated;
drop trigger if exists trg_twitch_mission_tick on public.fnc_reward_ticks;
create trigger trg_twitch_mission_tick
after insert on public.fnc_reward_ticks
for each row execute function private.on_twitch_mission_tick();

create or replace function public.get_my_missions()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
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
          and (coalesce(t.xp_awarded,0)>0 or coalesce(t.fnc_awarded,0)>0)
      ) as progress_minutes
  ) p on true
  left join public.mission_claims c
    on c.user_id=v_user_id and c.mission_id=m.id and c.period_start=p.period_start
  where m.active=true;

  return coalesce(v_result,jsonb_build_object('ok',true,'missions','[]'::jsonb));
end;
$function$;

revoke all on function public.get_my_missions() from public, anon;
grant execute on function public.get_my_missions() to authenticated;
