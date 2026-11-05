create table if not exists private.twitch_watch_streak_awards (
  user_id uuid not null references public.users(id) on delete cascade,
  milestone integer not null check (milestone in (3,5,10,20,30)),
  xp_awarded integer not null check (xp_awarded > 0),
  qualifying_stream_id text not null references public.twitch_streams(stream_id),
  awarded_at timestamptz not null default now(),
  primary key (user_id, milestone)
);

alter table private.twitch_watch_streak_awards enable row level security;
revoke all on table private.twitch_watch_streak_awards from public, anon, authenticated;

create or replace function private.award_twitch_watch_streak_for_user(p_user_id uuid, p_stream_id text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_streak integer := 0;
  v_milestone integer;
  v_xp integer;
  v_new_award boolean;
  v_previous_role text := current_setting('request.jwt.claim.role', true);
begin
  if p_user_id is null or p_stream_id is null or not exists (
    select 1 from public.twitch_streams s where s.stream_id = p_stream_id and s.ended_at is not null
  ) then return; end if;

  with stream_minutes as (
    select s.stream_id, s.started_at, coalesce(sum(ws.active_minutes), 0)::integer as watched_minutes
    from public.twitch_streams s
    left join public.watch_sessions ws on ws.twitch_stream_id = s.stream_id
      and ws.user_id = p_user_id and ws.platform = 'twitch'
    where s.ended_at is not null
    group by s.stream_id, s.started_at
  ), ranked as (
    select watched_minutes, row_number() over (order by started_at desc, stream_id desc) as rn
    from stream_minutes
  )
  select greatest(coalesce(min(rn) filter (where watched_minutes < 10), count(*) + 1) - 1, 0)::integer
  into v_streak from ranked;

  if v_streak < 3 then return; end if;

  for v_milestone, v_xp in
    select milestone, xp from (values (3,25),(5,50),(10,100),(20,250),(30,500)) as rewards(milestone,xp)
    where milestone <= v_streak order by milestone
  loop
    insert into private.twitch_watch_streak_awards (user_id,milestone,xp_awarded,qualifying_stream_id)
    values (p_user_id,v_milestone,v_xp,p_stream_id)
    on conflict (user_id,milestone) do nothing;
    v_new_award := found;
    if v_new_award then
      perform pg_catalog.set_config('request.jwt.claim.role','service_role',true);
      update public.users set xp=coalesce(xp,0)+v_xp, monthly_xp=coalesce(monthly_xp,0)+v_xp, updated_at=now()
      where id=p_user_id;
      perform pg_catalog.set_config('request.jwt.claim.role',coalesce(v_previous_role,''),true);
    end if;
  end loop;
  perform pg_catalog.set_config('request.jwt.claim.role',coalesce(v_previous_role,''),true);
exception when others then
  perform pg_catalog.set_config('request.jwt.claim.role',coalesce(v_previous_role,''),true);
  raise;
end;
$$;
revoke all on function private.award_twitch_watch_streak_for_user(uuid,text) from public,anon,authenticated;

create or replace function private.on_twitch_stream_ended_award_streak()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_user_id uuid;
begin
  if new.ended_at is null then return new; end if;
  if tg_op='UPDATE' and old.ended_at is not null then return new; end if;
  for v_user_id in
    select ws.user_id from public.watch_sessions ws
    where ws.twitch_stream_id=new.stream_id and ws.platform='twitch'
    group by ws.user_id having coalesce(sum(ws.active_minutes),0)>=10
  loop
    perform private.award_twitch_watch_streak_for_user(v_user_id,new.stream_id);
  end loop;
  return new;
end;
$$;

create or replace function private.on_twitch_watch_session_streak_update()
returns trigger language plpgsql security definer set search_path = '' as $$
declare v_stream_ended boolean; v_watched_minutes integer;
begin
  if new.twitch_stream_id is null or new.user_id is null or new.platform<>'twitch' then return new; end if;
  select (s.ended_at is not null) into v_stream_ended from public.twitch_streams s where s.stream_id=new.twitch_stream_id;
  if coalesce(v_stream_ended,false)=false then return new; end if;
  select coalesce(sum(ws.active_minutes),0)::integer into v_watched_minutes
  from public.watch_sessions ws where ws.twitch_stream_id=new.twitch_stream_id and ws.user_id=new.user_id and ws.platform='twitch';
  if v_watched_minutes>=10 then perform private.award_twitch_watch_streak_for_user(new.user_id,new.twitch_stream_id); end if;
  return new;
end;
$$;

revoke all on function private.on_twitch_stream_ended_award_streak() from public,anon,authenticated;
revoke all on function private.on_twitch_watch_session_streak_update() from public,anon,authenticated;

drop trigger if exists trg_twitch_stream_ended_award_streak on public.twitch_streams;
create trigger trg_twitch_stream_ended_award_streak after update of ended_at on public.twitch_streams
for each row when (new.ended_at is not null) execute function private.on_twitch_stream_ended_award_streak();

drop trigger if exists trg_twitch_watch_session_streak_update on public.watch_sessions;
create trigger trg_twitch_watch_session_streak_update after insert or update of active_minutes,twitch_stream_id,ended_at on public.watch_sessions
for each row when (new.twitch_stream_id is not null and new.platform='twitch')
execute function private.on_twitch_watch_session_streak_update();

create or replace function public.get_twitch_watch_streak_badges(p_twitch_username text)
returns text[] language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg('streak_'||a.milestone::text order by a.milestone),array[]::text[])
  from public.users u left join private.twitch_watch_streak_awards a on a.user_id=u.id
  where lower(u.twitch_username)=lower(trim(p_twitch_username))
    and (
      (auth.uid() is not null and exists(select 1 from public.admin_users admin where admin.user_id=auth.uid()))
      or (u.profile_complete=true and coalesce(u.is_blocked,false)=false
          and not exists(select 1 from public.admin_users target_admin where target_admin.user_id=u.id))
    )
  limit 1;
$$;
revoke all on function public.get_twitch_watch_streak_badges(text) from public;
grant execute on function public.get_twitch_watch_streak_badges(text) to anon,authenticated;