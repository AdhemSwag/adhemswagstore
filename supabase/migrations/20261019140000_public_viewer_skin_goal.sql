CREATE OR REPLACE FUNCTION public.get_public_viewer_skin_goal(p_twitch_username text)
RETURNS TABLE (
  twitch_username text,
  skin_goal_name text,
  skin_goal_image_url text,
  skin_goal_fnc_cost bigint,
  fnc_points bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
  SELECT
    u.twitch_username,
    r.name AS skin_goal_name,
    r.image_url AS skin_goal_image_url,
    r.fnc_cost AS skin_goal_fnc_cost,
    COALESCE(u.fnc_points, 0)::bigint AS fnc_points
  FROM public.users AS u
  LEFT JOIN public.user_skin_goals AS g ON g.user_id = u.id
  LEFT JOIN public.rewards AS r ON r.id = g.reward_id
  WHERE u.profile_complete = true
    AND COALESCE(u.is_blocked, false) = false
    AND NULLIF(BTRIM(u.twitch_username), '') IS NOT NULL
    AND LOWER(u.twitch_username) = LOWER(BTRIM(p_twitch_username))
  LIMIT 1;
$function$;

REVOKE ALL ON FUNCTION public.get_public_viewer_skin_goal(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_viewer_skin_goal(text) TO anon, authenticated, service_role;
