-- Step 16 security hardening: members may update only profile-editable columns.
-- Reward/economy/security fields remain backend-controlled.
revoke update on table public.users from authenticated;
grant update (
  email,
  steam_profile_url,
  steam_trade_url,
  discord_username
) on table public.users to authenticated;
