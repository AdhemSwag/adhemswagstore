-- Prevent client roles from directly mutating privileged economy, event, and admin tables.
revoke insert, update, delete on table public.transactions from anon, authenticated;
revoke insert, update, delete on table public.redemptions from anon, authenticated;
revoke insert, update, delete on table public.live_codes from anon, authenticated;
revoke insert, update, delete on table public.live_code_redemptions from anon, authenticated;
revoke insert, update, delete on table public.reward_access_codes from anon, authenticated;
revoke insert, update, delete on table public.twitch_events from anon, authenticated;
revoke insert, update, delete on table public.fnc_bonuses from anon, authenticated;
revoke insert, update, delete on table public.fnc_imports from anon, authenticated;
revoke insert, update, delete on table public.fnc_settings from anon, authenticated;
revoke insert, update, delete on table public.admin_logs from anon, authenticated;
revoke insert, update, delete on table public.admin_users from anon, authenticated;
revoke insert, update, delete on table public.system_config from anon, authenticated;
