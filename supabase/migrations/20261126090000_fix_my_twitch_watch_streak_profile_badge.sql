-- Fix the signed-in profile streak source.
-- The users row does not store twitch_watch_streak; it is derived from verified
-- Twitch watch sessions and completed broadcasts. Keep this read-only and scoped
-- to auth.uid() so every signed-in viewer can load their own current streak.
create or replace function public.get_my_twitch_watch_streak()
returns integer
language sql
stable
security definer
set search_path = ''
as $function$
  select coalesce((
    select greatest(
      coalesce(min(rn) filter (where watched_minutes < 10), count(*) + 1) - 1,
      0
    )::integer
    from (
      with stream_minutes as (
        select
          s.stream_id,
          s.started_at,
          coalesce(sum(ws.active_minutes), 0)::integer as watched_minutes
        from public.users u
        join public.twitch_streams s
          on s.started_at >= u.created_at
        left join public.watch_sessions ws
          on ws.twitch_stream_id = s.stream_id
         and ws.user_id = u.id
         and ws.platform = 'twitch'
        where u.id = auth.uid()
          and (
            s.ended_at is not null
            or exists (
              select 1
              from public.watch_sessions live_ws
              where live_ws.twitch_stream_id = s.stream_id
                and live_ws.user_id = u.id
                and live_ws.platform = 'twitch'
              group by live_ws.twitch_stream_id
              having sum(live_ws.active_minutes) >= 10
            )
          )
        group by s.stream_id, s.started_at
      )
      select
        watched_minutes,
        row_number() over (order by started_at desc, stream_id desc) as rn
      from stream_minutes
    ) ranked
  ), 0)::integer;
$function$;

revoke all on function public.get_my_twitch_watch_streak() from public, anon;
grant execute on function public.get_my_twitch_watch_streak() to authenticated, service_role;
