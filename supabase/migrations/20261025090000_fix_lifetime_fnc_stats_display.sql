-- Keep lifetime FNC stats consistent across public leaderboard and viewer profiles.
-- Use the stored lifetime total, but never display less than the sum of recorded earning events.
-- GREATEST avoids adding the ledger to a total that may already include those same rewards.
CREATE OR REPLACE FUNCTION public.get_public_leaderboard_full()
RETURNS SETOF jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT to_jsonb(r)
  FROM (
    SELECT
      row_number() OVER (ORDER BY u.fnc_points DESC, lower(u.twitch_username) ASC) AS rank,
      u.twitch_username,
      coalesce(u.fnc_points, 0) AS fnc_points,
      coalesce(u.xp, 0) AS xp,
      coalesce(u.level, 1) AS level,
      coalesce(u.total_watch_minutes, 0) AS total_watch_minutes,
      coalesce(u.streak, 0) AS streak,
      GREATEST(
        coalesce(u.total_fnc_earned, 0),
        coalesce((
          SELECT sum(t.amount)
          FROM public.transactions AS t
          WHERE t.user_id = u.id
            AND t.amount > 0
            AND (
              t.type IN ('watch_fnc', 'import')
              OR (t.type = 'admin_adjustment' AND t.source = 'live_code')
            )
        ), 0)
      ) AS total_fnc_earned,
      coalesce(nullif(au.raw_user_meta_data->>'avatar_url', ''), nullif(au.raw_user_meta_data->>'picture', ''), nullif(au.raw_user_meta_data->>'profile_image_url', '')) AS avatar_url
    FROM public.users AS u
    JOIN auth.users AS au ON au.id = u.id
    WHERE u.profile_complete = true
      AND coalesce(u.is_blocked, false) = false
      AND nullif(trim(u.twitch_username), '') IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM public.admin_users AS a WHERE a.user_id = u.id)
    ORDER BY u.fnc_points DESC, lower(u.twitch_username) ASC
  ) AS r;
$function$;

CREATE OR REPLACE FUNCTION public.get_public_viewer_profile(p_twitch_username text)
RETURNS TABLE (
  twitch_username text,
  fnc_points bigint,
  xp bigint,
  level integer,
  total_watch_minutes bigint,
  streak integer,
  total_fnc_earned bigint,
  fnc_supporter boolean,
  fnc_vip boolean,
  twitch_subscription_verified boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT
    u.twitch_username,
    COALESCE(u.fnc_points, 0)::bigint,
    COALESCE(u.xp, 0)::bigint,
    GREATEST(COALESCE(u.level, 1), 1)::integer,
    COALESCE(u.total_watch_minutes, 0)::bigint,
    COALESCE(u.streak, 0)::integer,
    GREATEST(
      COALESCE(u.total_fnc_earned, 0),
      COALESCE((
        SELECT sum(t.amount)
        FROM public.transactions AS t
        WHERE t.user_id = u.id
          AND t.amount > 0
          AND (
            t.type IN ('watch_fnc', 'import')
            OR (t.type = 'admin_adjustment' AND t.source = 'live_code')
          )
      ), 0)
    )::bigint,
    COALESCE(u.fnc_supporter, false),
    COALESCE(u.fnc_vip, false),
    COALESCE(u.twitch_subscription_verified, false)
  FROM public.users AS u
  WHERE u.profile_complete = true
    AND COALESCE(u.is_blocked, false) = false
    AND NULLIF(TRIM(u.twitch_username), '') IS NOT NULL
    AND lower(u.twitch_username) = lower(trim(p_twitch_username))
    AND NOT EXISTS (SELECT 1 FROM public.admin_users AS a WHERE a.user_id = u.id)
  LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM anon;
REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_viewer_profile(text) TO anon, authenticated, service_role;
