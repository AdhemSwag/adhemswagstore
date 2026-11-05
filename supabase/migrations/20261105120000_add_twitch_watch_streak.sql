-- Twitch Watch Streak: count consecutive broadcasts, not consecutive calendar days.
-- A viewer qualifies for a broadcast after at least 10 verified active minutes.
-- The old users.streak daily counter remains untouched for compatibility.

CREATE TABLE IF NOT EXISTS public.twitch_streams (
  stream_id text PRIMARY KEY,
  broadcaster_user_id text NOT NULL,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.twitch_streams ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.twitch_streams FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.twitch_streams TO service_role;

ALTER TABLE public.watch_sessions
  ADD COLUMN IF NOT EXISTS twitch_stream_id text,
  ADD COLUMN IF NOT EXISTS twitch_stream_started_at timestamptz;

CREATE INDEX IF NOT EXISTS watch_sessions_user_twitch_stream_idx
  ON public.watch_sessions(user_id, twitch_stream_id)
  WHERE platform = 'twitch' AND twitch_stream_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS twitch_streams_started_at_idx
  ON public.twitch_streams(started_at DESC);

DROP FUNCTION IF EXISTS public.get_public_viewer_profile(text);
CREATE FUNCTION public.get_public_viewer_profile(p_twitch_username text)
RETURNS TABLE (
  twitch_username text, fnc_points bigint, xp bigint, level integer,
  total_watch_minutes bigint, streak integer, twitch_watch_streak integer,
  total_fnc_earned bigint, fnc_supporter boolean, fnc_vip boolean,
  twitch_subscription_verified boolean
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $function$
  SELECT u.twitch_username, COALESCE(u.fnc_points,0)::bigint,
    COALESCE(u.xp,0)::bigint, GREATEST(COALESCE(u.level,1),1)::integer,
    COALESCE(u.total_watch_minutes,0)::bigint, COALESCE(u.streak,0)::integer,
    COALESCE(streak_data.twitch_watch_streak,0)::integer,
    GREATEST(COALESCE(u.total_fnc_earned,0), COALESCE((
      SELECT sum(t.amount) FROM public.transactions t
      WHERE t.user_id=u.id AND t.amount>0
        AND (t.type IN ('watch_fnc','import')
          OR (t.type='admin_adjustment' AND t.source='live_code'))
    ),0))::bigint,
    COALESCE(u.fnc_supporter,false), COALESCE(u.fnc_vip,false),
    COALESCE(u.twitch_subscription_verified,false)
  FROM public.users u
  LEFT JOIN LATERAL (
    WITH stream_minutes AS (
      SELECT s.stream_id,s.started_at,s.ended_at,
        COALESCE(sum(ws.active_minutes),0)::integer AS watched_minutes
      FROM public.twitch_streams s
      LEFT JOIN public.watch_sessions ws
        ON ws.twitch_stream_id=s.stream_id AND ws.user_id=u.id AND ws.platform='twitch'
      WHERE s.ended_at IS NOT NULL OR EXISTS (
        SELECT 1 FROM public.watch_sessions live_ws
        WHERE live_ws.twitch_stream_id=s.stream_id AND live_ws.user_id=u.id
          AND live_ws.platform='twitch'
        GROUP BY live_ws.twitch_stream_id
        HAVING sum(live_ws.active_minutes)>=10
      )
      GROUP BY s.stream_id,s.started_at,s.ended_at
    ), ranked AS (
      SELECT watched_minutes,row_number() OVER (ORDER BY started_at DESC,stream_id DESC) rn
      FROM stream_minutes
    )
    SELECT GREATEST(COALESCE(min(rn) FILTER (WHERE watched_minutes<10),count(*)+1)-1,0)::integer
      AS twitch_watch_streak
    FROM ranked
  ) streak_data ON true
  WHERE u.profile_complete=true AND COALESCE(u.is_blocked,false)=false
    AND NULLIF(TRIM(u.twitch_username),'') IS NOT NULL
    AND lower(u.twitch_username)=lower(trim(p_twitch_username))
    AND NOT EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id=u.id)
  LIMIT 1;
$function$;
REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_viewer_profile(text) TO anon, authenticated, service_role;

DROP FUNCTION IF EXISTS public.get_admin_profile_preview(text);
CREATE FUNCTION public.get_admin_profile_preview(p_twitch_username text)
RETURNS TABLE (
  twitch_username text, profile_complete boolean, fnc_points bigint, xp bigint,
  level integer, total_watch_minutes bigint, streak integer, twitch_watch_streak integer,
  fnc_supporter boolean, fnc_vip boolean, twitch_subscription_verified boolean, id uuid
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = 'pg_catalog','public','auth'
AS $function$
  SELECT u.twitch_username,u.profile_complete,u.fnc_points,u.xp,u.level,
    u.total_watch_minutes,u.streak,COALESCE(streak_data.twitch_watch_streak,0)::integer,
    COALESCE(u.fnc_supporter,false),COALESCE(u.fnc_vip,false),
    COALESCE(u.twitch_subscription_verified,false),u.id
  FROM public.users u
  LEFT JOIN LATERAL (
    WITH stream_minutes AS (
      SELECT s.stream_id,s.started_at,s.ended_at,
        COALESCE(sum(ws.active_minutes),0)::integer AS watched_minutes
      FROM public.twitch_streams s
      LEFT JOIN public.watch_sessions ws
        ON ws.twitch_stream_id=s.stream_id AND ws.user_id=u.id AND ws.platform='twitch'
      WHERE s.ended_at IS NOT NULL OR EXISTS (
        SELECT 1 FROM public.watch_sessions live_ws
        WHERE live_ws.twitch_stream_id=s.stream_id AND live_ws.user_id=u.id
          AND live_ws.platform='twitch'
        GROUP BY live_ws.twitch_stream_id
        HAVING sum(live_ws.active_minutes)>=10
      )
      GROUP BY s.stream_id,s.started_at,s.ended_at
    ), ranked AS (
      SELECT watched_minutes,row_number() OVER (ORDER BY started_at DESC,stream_id DESC) rn
      FROM stream_minutes
    )
    SELECT GREATEST(COALESCE(min(rn) FILTER (WHERE watched_minutes<10),count(*)+1)-1,0)::integer
      AS twitch_watch_streak
    FROM ranked
  ) streak_data ON true
  WHERE lower(u.twitch_username)=lower(trim(p_twitch_username))
    AND auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id=auth.uid())
  LIMIT 1;
$function$;
REVOKE ALL ON FUNCTION public.get_admin_profile_preview(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_profile_preview(text) TO authenticated;
