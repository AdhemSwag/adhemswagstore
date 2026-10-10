-- Public viewer profile RPC: expose only approved progression fields.
-- Keep SECURITY DEFINER functions on a trusted search_path.
ALTER FUNCTION public.is_admin_user() SET search_path = pg_catalog, public;
ALTER FUNCTION public.record_sponsor_click(uuid) SET search_path = pg_catalog, public;
ALTER FUNCTION public.record_sponsor_impression(uuid) SET search_path = pg_catalog, public;

REVOKE EXECUTE ON FUNCTION public.get_fnc_leaderboard() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_leaderboard_full() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_watcher_leaderboard(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_public_viewer_profile(p_twitch_username text)
RETURNS TABLE (
  twitch_username text,
  fnc_points bigint,
  xp bigint,
  level integer,
  total_watch_minutes bigint,
  streak integer,
  total_fnc_earned bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
  SELECT
    u.twitch_username,
    COALESCE(u.fnc_points, 0)::bigint,
    COALESCE(u.xp, 0)::bigint,
    GREATEST(COALESCE(u.level, 1), 1)::integer,
    COALESCE(u.total_watch_minutes, 0)::bigint,
    COALESCE(u.streak, 0)::integer,
    COALESCE(u.total_fnc_earned, 0)::bigint
  FROM public.users AS u
  WHERE u.profile_complete = true
    AND COALESCE(u.is_blocked, false) = false
    AND NULLIF(TRIM(u.twitch_username), '') IS NOT NULL
    AND lower(u.twitch_username) = lower(trim(p_twitch_username))
    AND NOT EXISTS (SELECT 1 FROM public.admin_users AS a WHERE a.user_id = u.id)
  LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_public_viewer_profile(text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_viewer_profile(text) TO anon, authenticated, service_role;
