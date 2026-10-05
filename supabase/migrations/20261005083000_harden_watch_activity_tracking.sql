-- Harden watch heartbeat so browser activity cannot refresh Twitch presence.
-- Twitch presence (last_seen_at) remains authoritative from twitch-chatters-sync.
-- Browser heartbeat can only update last_activity_at or end its own session after AFK grace.

create or replace function public.record_watch_activity(p_session_id uuid, p_activity boolean)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  s record;
  now_ts timestamptz := now();
  afk_grace interval := interval '5 minutes';
begin
  if uid is null then
    raise exception 'unauthorized';
  end if;

  select id, last_activity_at, ended_at
    into s
  from public.watch_sessions
  where id = p_session_id
    and user_id = uid
    and platform = 'twitch'
  for update;

  if s.id is null or s.ended_at is not null then
    return jsonb_build_object('ok', true, 'tracking', false, 'reason', 'session_not_active');
  end if;

  if p_activity then
    update public.watch_sessions
      set last_activity_at = now_ts
    where id = s.id and ended_at is null;
    return jsonb_build_object('ok', true, 'tracking', true, 'afk', false, 'session_id', s.id);
  end if;

  if now_ts - coalesce(s.last_activity_at, now_ts) >= afk_grace then
    update public.watch_sessions
      set ended_at = now_ts
    where id = s.id and ended_at is null;
    return jsonb_build_object('ok', true, 'tracking', false, 'afk', true, 'session_id', s.id);
  end if;

  return jsonb_build_object('ok', true, 'tracking', true, 'afk', true, 'grace', true, 'session_id', s.id);
end;
$$;

revoke all on function public.record_watch_activity(uuid, boolean) from public, anon;
grant execute on function public.record_watch_activity(uuid, boolean) to authenticated;
