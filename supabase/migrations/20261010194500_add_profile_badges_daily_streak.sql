-- Badge eligibility and daily Twitch activity streaks.
-- Does not modify FNC/XP balances, multipliers, or rewards.

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS streak_last_activity_date date,
  ADD COLUMN IF NOT EXISTS fnc_supporter boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS fnc_vip boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS twitch_subscription_verified boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.grant_fnc_supporter_on_confirmed_donation()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public AS $$
BEGIN
  IF NEW.user_id IS NOT NULL AND NEW.amount_usd > 0
     AND NULLIF(BTRIM(NEW.external_event_id), '') IS NOT NULL THEN
    UPDATE public.users SET fnc_supporter = true WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS donations_grant_fnc_supporter ON public.donations;
CREATE TRIGGER donations_grant_fnc_supporter
AFTER INSERT ON public.donations
FOR EACH ROW EXECUTE FUNCTION public.grant_fnc_supporter_on_confirmed_donation();

CREATE OR REPLACE FUNCTION public.admin_set_viewer_vip(p_user_id uuid, p_enabled boolean)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public, auth AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()
  ) THEN RAISE EXCEPTION 'admin_only'; END IF;
  UPDATE public.users SET fnc_vip = p_enabled WHERE id = p_user_id;
  RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_viewer_vip(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_viewer_vip(uuid, boolean) TO authenticated;

DROP FUNCTION IF EXISTS public.get_public_viewer_profile(text);
CREATE FUNCTION public.get_public_viewer_profile(p_twitch_username text)
RETURNS TABLE (
  twitch_username text, fnc_points bigint, xp bigint, level integer,
  total_watch_minutes bigint, streak integer, total_fnc_earned bigint,
  fnc_supporter boolean, fnc_vip boolean, twitch_subscription_verified boolean
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = pg_catalog, public AS $function$
  SELECT u.twitch_username, COALESCE(u.fnc_points,0)::bigint,
    COALESCE(u.xp,0)::bigint, GREATEST(COALESCE(u.level,1),1)::integer,
    COALESCE(u.total_watch_minutes,0)::bigint, COALESCE(u.streak,0)::integer,
    COALESCE(u.total_fnc_earned,0)::bigint, COALESCE(u.fnc_supporter,false),
    COALESCE(u.fnc_vip,false), COALESCE(u.twitch_subscription_verified,false)
  FROM public.users u
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
  level integer, total_watch_minutes bigint, streak integer, fnc_supporter boolean,
  fnc_vip boolean, twitch_subscription_verified boolean, id uuid
)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = pg_catalog, public, auth AS $function$
  SELECT u.twitch_username, u.profile_complete, u.fnc_points, u.xp, u.level,
    u.total_watch_minutes, u.streak, COALESCE(u.fnc_supporter,false),
    COALESCE(u.fnc_vip,false), COALESCE(u.twitch_subscription_verified,false), u.id
  FROM public.users u
  WHERE lower(u.twitch_username)=lower(trim(p_twitch_username))
    AND EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id=auth.uid())
  LIMIT 1;
$function$;
REVOKE ALL ON FUNCTION public.get_admin_profile_preview(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_profile_preview(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.record_watch_activity(p_session_id uuid, p_activity boolean)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public AS $$
DECLARE
  uid uuid := auth.uid();
  s record;
  now_ts timestamptz := now();
  today_algiers date := (now() AT TIME ZONE 'Africa/Algiers')::date;
  current_streak integer;
  last_day date;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'unauthorized'; END IF;
  SELECT id, last_activity_at, ended_at, active_minutes, last_seen_at INTO s
  FROM public.watch_sessions
  WHERE id=p_session_id AND user_id=uid AND platform='twitch'
  FOR UPDATE;
  IF s.id IS NULL OR s.ended_at IS NOT NULL THEN
    RETURN jsonb_build_object('ok',true,'tracking',false,'reason','session_not_active');
  END IF;

  IF p_activity THEN
    UPDATE public.watch_sessions SET last_activity_at=now_ts WHERE id=s.id AND ended_at IS NULL;
    IF COALESCE(s.active_minutes,0)>=10 AND s.last_seen_at>=now_ts-interval '2 minutes' THEN
      SELECT streak, streak_last_activity_date INTO current_streak,last_day
      FROM public.users WHERE id=uid FOR UPDATE;
      IF last_day IS DISTINCT FROM today_algiers THEN
        UPDATE public.users
        SET streak=CASE WHEN last_day=today_algiers-1 THEN COALESCE(current_streak,0)+1 ELSE 1 END,
            streak_last_activity_date=today_algiers
        WHERE id=uid;
      END IF;
    END IF;
    RETURN jsonb_build_object('ok',true,'tracking',true,'afk',false,'session_id',s.id);
  END IF;

  IF now_ts-COALESCE(s.last_activity_at,now_ts)>=interval '5 minutes' THEN
    UPDATE public.watch_sessions SET ended_at=now_ts WHERE id=s.id AND ended_at IS NULL;
    RETURN jsonb_build_object('ok',true,'tracking',false,'afk',true,'session_id',s.id);
  END IF;
  RETURN jsonb_build_object('ok',true,'tracking',true,'afk',true,'grace',true,'session_id',s.id);
END;
$$;
REVOKE ALL ON FUNCTION public.record_watch_activity(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_watch_activity(uuid, boolean) TO authenticated;
