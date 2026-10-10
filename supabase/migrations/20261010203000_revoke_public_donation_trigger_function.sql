-- The donation trigger invokes this function internally; clients must not call it directly.
REVOKE ALL ON FUNCTION public.grant_fnc_supporter_on_confirmed_donation() FROM PUBLIC, anon, authenticated;
