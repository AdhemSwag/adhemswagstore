ALTER FUNCTION public.claim_legacy_streamelements_fnc(uuid)
  SET search_path = pg_catalog, public, auth, private, pg_temp;

ALTER FUNCTION public.redeem_reward_service(uuid, uuid, text)
  SET search_path = pg_catalog, public, auth, private, pg_temp;
