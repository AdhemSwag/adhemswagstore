-- Keep privileged service RPCs callable only by trusted server-side callers.
-- Public leaderboard RPCs remain public intentionally.
revoke execute on function public.get_twitch_watch_config() from public, anon, authenticated;
revoke execute on function public.store_twitch_watch_credentials(text,text) from public, anon, authenticated;
revoke execute on function public.admin_process_redemption_action(uuid,uuid,text,text) from public, anon, authenticated;
revoke execute on function public.admin_store_twitch_watch_credentials(uuid,text,text,text,text,text) from public, anon, authenticated;
revoke execute on function public.redeem_live_code_service(uuid,text) from public, anon, authenticated;
revoke execute on function public.redeem_reward_service(uuid,uuid,text) from public, anon, authenticated;
revoke execute on function public.admin_operations_snapshot() from public, anon, authenticated;
revoke execute on function public.claim_legacy_streamelements_fnc(uuid) from public, anon, authenticated;
