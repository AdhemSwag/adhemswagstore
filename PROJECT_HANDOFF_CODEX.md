# AdhemSwag FNC Rewards — Codex Project Handoff

Repository: AdhemSwag/adhemswagstore
Branch: main
Website: https://adhemswag.com
Owner/brand: AdhemSwag
Theme accent: #11D9F7
Main phrase: WATCH • EARN • REDEEM

## 1. IMPORTANT WORKING RULES
- Continue from the existing repository state. Do NOT restart the project.
- Preserve the existing visual identity, sidebar, header, footer, partner images, and unrelated files unless explicitly requested.
- Always use the existing AdhemSwag theme: dark esports UI, cyan #11D9F7, existing borders/cards/buttons/icons.
- Do not introduce random colors or a different icon style.
- Do not modify partner images unless explicitly requested.
- Security first: NEVER put Twitch client secrets, Supabase service_role keys, webhook secrets, or other secrets in public GitHub.
- FNC/XP rewards are currently STOPPED. Do not activate real earning/redeeming until the backend is complete, tested, and explicitly approved.
- Twitch is currently the primary platform. Kick is optional for now. Future Kick-primary architecture was discussed but is NOT to be implemented yet.
- Use GitHub main branch unless the user explicitly requests another branch.
- Before changing an existing file, inspect its current content and preserve unrelated work.

## 2. CURRENT SITE NAVIGATION
Final intended meanings:
- MY PROFILE -> /profile/ : viewer profile, progression, FNC, XP, Level, redeem code, history
- SETTINGS -> /settings/ : viewer account settings / connected accounts / preferences
- CONFIG -> /config/ : user's own CS2 settings/configuration
- STORE -> /store/ : FNC rewards store
- LEADERBOARD -> /leaderboard/
- BONUS -> /bonuses/
- DONATE -> /donate/
- FACEIT external link

Left sidebar:
- Dashboard
- Leaderboard
- STORE
- Bonus
- MY PROFILE
- CONFIG
- Donate
Do NOT put PROFILE and SETTINGS as separate sidebar items.

## 3. TOP-RIGHT ACCOUNT UI
Current intended design:
- Before connection: CONNECT TWITCH in the top-right corner of the header.
- It MUST stay in the same top-right header position.
- Do not move it to the center, sidebar, or another area.
- After Twitch connection: avatar + Twitch username + compact account menu.
- Current menu:
  - PROFILE
  - SETTINGS
  - DISCONNECT
- HISTORY and REDEEM CODE should be integrated into PROFILE, not separate top-right menu items.
- Future visual idea approved: after connection, compact header may show avatar + username + small FNC icon/value + small XP bar + level, while full details remain in PROFILE. This is a future enhancement, not necessarily implemented yet.

## 4. PROFILE PAGE
URL: /profile/
Profile should contain:
- Twitch avatar
- Twitch username
- FNC Points
- XP
- Level
- XP progress bar to next level
- REDEEM CODE section
- HISTORY section

Profile must NOT display XP Rank or FNC Rank.
Leaderboard is a separate page.

REDEEM CODE:
- Viewer enters a promotional/event code.
- Valid code can grant configured FNC/XP/reward.
- Invalid, expired, disabled, or already-used code must be rejected.
- Admin should eventually be able to create/manage codes.
- Keep this feature inside PROFILE.

HISTORY:
- FNC earned (watch, sub, bits, donation, raid)
- FNC spent (store redemption)
- XP earned
- Reward redemptions and statuses
- Refunds/rejections with date and reason
- This should be part of PROFILE, not a separate page.

## 5. FNC RULES (CURRENT LOCKED VERSION)
When rewards are eventually activated:
- Normal viewer: 1 FNC per active minute
- Subscriber: 3 FNC per active minute
- Subscriber instant bonus: +500 FNC
- Bits: 1 FNC per Bit
- Donation: 100 FNC per $1
- Raid: +100 FNC to each participating eligible viewer
- Raider/streamer does NOT receive the 100 FNC participant bonus.
- No FNC directly from XP/level at launch.
- No betting/gambling system.

Important anti-double-reward rule:
- One viewer profile = one FNC balance.
- If Twitch and Kick are both connected later, they remain linked to the same profile.
- Opening Twitch + Kick simultaneously must NOT award double watch points.
- Maximum watch reward remains 1 reward/minute for a normal viewer, or 3/minute for a subscriber, not one reward per platform.
- This dual-platform architecture is FUTURE work. Do not activate Kick rewards now.

## 6. XP / LEVEL
XP is separate from FNC.
Current approved level curve proposal:
- Level 1 = 0 XP
- Level 2 = 750
- Level 3 = 1,750
- Level 4 = 3,000
- Level 5 = 4,500
- Level 6 = 6,250
- Level 7 = 8,250
- Level 8 = 10,500
- Level 9 = 13,000
- Level 10 = 15,750
- Level 11 = 18,750
- Level 12 = 22,000
- Level 13 = 25,500
- Level 14 = 29,250
- Level 15 = 33,250
- Level 20 = 57,000
- Level 25 = 87,500
- Level 30 = 128,250
- Level 40 = 223,500
- Level 50 = 348,750

Only Level 1 -> Level 2 = 750 XP is explicitly locked; the rest is a current proposal and should be confirmed before treating every threshold as final.

Proposed XP sources (not fully locked):
- Chat with cooldown
- Active watch
- Subscription
- Bits
- Donation
- Raid participation
Do NOT assume these XP amounts are final without user confirmation.

## 7. STORE / REDEMPTION RULES
Viewer needs BOTH:
1. enough FNC
2. required Level/XP

Example:
Sport Gloves | Red Racer
20,000 FNC
Level 15 required

On redemption:
1. Viewer must be connected.
2. Reward must be active.
3. Enough FNC.
4. Required Level/XP.
5. Deduct FNC exactly once server-side.
6. Record transaction.
7. Create pending redemption.
8. Notify admin.

If admin rejects:
- redemption status = rejected
- automatic FNC refund
- refund transaction recorded
- rejection reason stored
- viewer sees reward, refunded amount, date, and exact rejection reason
- must be idempotent to prevent double deduction/refund.

## 8. ADMIN PANEL
URL: /admin/
Current state: UI FOUNDATION ONLY. It is NOT a fully functional secure admin backend.

Sections already designed:
- Dashboard
- Rewards / Store
- Redemptions
- Viewers
- Transactions
- System

Reward management fields:
- Reward name
- FNC cost
- Level required
- Stock
- Description
- Reward image
- Active/inactive

Redemptions:
- Viewer
- Reward
- FNC
- Steam Trade Link
- Date
- Approve / Reject
- Rejection reason + refund

Viewers:
- Search
- Add/remove FNC
- Add XP
- Block

Transactions:
- Full audit history

System:
- Rewards enabled
- Points enabled
- XP enabled
These must remain OFF until explicitly activated.

Security banner in current admin UI says privileged auth/write actions are intentionally locked until secure admin identity is connected to Supabase.

## 9. SUPABASE
Project:
- Name: FNC POINTS
- Ref: lpmocfdfpebcaseffugg
- Region: eu-west-3
- PostgreSQL 17.6.1
- Status previously verified ACTIVE_HEALTHY

Existing public tables:
- users
- rewards
- redemptions
- transactions
- watch_sessions
- chat_activity
- raid_events
- raid_participants
- donations
- twitch_events
- system_config
- fnc_imports

RLS is enabled on all public tables.
Internal tables are protected by deny-all RLS policies for anon/authenticated:
- donations
- fnc_imports
- raid_events
- system_config
- twitch_events
Security advisor currently reports no findings.
Run Supabase security advisors after DDL/security changes.

Important Supabase security:
- Never expose service_role in frontend.
- Use publishable/anon key client-side.
- Admin authorization should use app_metadata, not user_metadata.
- Secure backend/server-side actions for privileged operations.

## 10. CURRENT DB SCHEMA IMPORTANT FIELDS
users:
- id uuid
- twitch_user_id unique
- twitch_username
- email
- email_verified
- steam_id
- steam_profile_url
- steam_trade_url
- profile_complete
- fnc_points
- xp
- level
- total_watch_minutes
- monthly_xp
- streak
- is_blocked
- total_fnc_earned
- kick_user_id optional
- kick_username optional
- kick_connected optional
- created_at
- updated_at

rewards:
- id
- name
- description
- fnc_cost
- xp_required
- level_required
- stock
- active
- image_url
- created_at
- updated_at

redemptions:
- id
- user_id
- reward_id
- fnc_spent
- status: pending/approved/sent/rejected/cancelled
- steam_trade_url_snapshot
- rejection_reason
- rejected_at
- refunded_at
- created_at
- updated_at

transactions:
- id
- user_id
- type: watch/chat/subscription/bits/donation/raid/redemption/admin_adjustment/import
- amount
- source
- external_event_id
- metadata jsonb
- created_at
- unique(type, external_event_id)

watch_sessions:
- id
- user_id
- stream_started_at
- joined_at
- last_seen_at
- active_minutes
- ended_at

chat_activity:
- id
- user_id
- twitch_message_id unique
- xp_awarded
- created_at

raid_events:
- id
- twitch_event_id unique
- source_broadcaster_id
- source_broadcaster_name
- viewer_count
- created_at

raid_participants:
- id
- raid_event_id
- user_id
- fnc_awarded
- unique(raid_event_id,user_id)

donations:
- id
- external_event_id unique
- user_id nullable
- amount_usd
- fnc_awarded
- anonymous
- created_at

twitch_events:
- id
- event_id unique
- event_type
- payload
- processed
- created_at
- processed_at

system_config:
- id boolean singleton
- rewards_enabled false
- points_enabled false
- xp_enabled false
- updated_at

fnc_imports:
- id
- twitch_user_id
- old_username
- legacy_username
- old_fnc
- imported_at
- source
- unique source + legacy_username index added

## 11. OLD STREAMELEMENTS FNC DATA — CRITICAL
Old StreamElements leaderboard data MUST NOT be deleted yet.

Current old leaderboard data is preserved in:
- leaderboard/data.json
- old leaderboard implementation/workflow/script

Old export contains roughly 1,500 staged viewer entries with username + points.
The current Supabase staging table `public.fnc_imports` contains exactly 1,500 rows and 637,690 total old FNC.
Those rows currently use temporary IDs in the form `legacy:<username>`, not canonical Twitch user IDs, so the migration is staged but NOT yet matched to live Twitch accounts.
It does not safely provide canonical Twitch IDs/avatars in the static export.

Goal:
- Recover/import ALL old StreamElements FNC balances first.
- Preserve old username + points.
- When a viewer connects Twitch, securely match canonical Twitch ID.
- Prefer a verified StreamElements export/API with Twitch IDs if available.
- Do NOT blindly match usernames without a safe migration strategy.
- Do NOT claim the migration is complete. The old balances are now staged in Supabase, but canonical Twitch matching and final balance import are still pending.
- Do NOT delete leaderboard/data.json until migration is verified.

Existing old files:
- leaderboard/index.html
- leaderboard/data.json
- .github/workflows/update-leaderboard.yml
- scripts/update_leaderboard.py

## 12. LEADERBOARD FINAL DESIGN
Separate /leaderboard/ page.
Three tabs:
1. XP Leaderboard
2. FNC Points Leaderboard (current balance)
3. All-Time FNC Earned (total earned historically, even if spent)

Profile should not show ranks.

## 13. TWITCH EVENT ARCHITECTURE
Twitch is current primary platform.
Expected secure backend/event processing:
- Twitch OAuth for viewer connection
- Twitch EventSub for events
- channel.chat.message for chat activity
- subscriber events
- Bits events
- raid events
- broadcaster online/offline
- follower if needed
- backend tracks active watch sessions because Twitch does not provide a simple viewer watch-hours total.

Do not put Twitch client secret in GitHub.
Use secure backend/EventSub webhook.

## 14. STEAM / PROFILE FIELDS
Profile should eventually have:
- Twitch required
- Email required
- Steam connected
- Steam ID automatically recovered from Steam connection; do not ask viewer to manually type Steam ID
- Steam Trade Link required for skin rewards
- Discord optional
- Kick optional
- Physical delivery information only if physical rewards are added later

## 15. OBS / CHAT REDEMPTION ALERT
Only STORE redemption should trigger:
- OBS Browser Source visual alert
- sound effect
- Twitch chat message
- Kick chat message if viewer has Kick connected and Kick is enabled

No alerts for:
- follows
- subs
- donations
- bits
- raids
- XP/level

Example:
NEW REWARD REDEEMED
Viewer
Sport Gloves | Red Racer
20,000 FNC

Sound must play once per redemption even if OBS/browser refreshes.
No private info.

## 16. CURRENT GITHUB PAGES / FRONTEND STATE
Existing pages:
- index.html
- donate/index.html
- bonuses/index.html
- settings/index.html
- leaderboard/index.html
- faq/index.html
- store/index.html
- profile/index.html
- config/index.html
- admin/index.html

Recent completed frontend changes:
- Sidebar PROFILE + SETTINGS removed.
- Sidebar now has MY PROFILE.
- CONFIG remains for CS2 configuration.
- STORE renamed from SwagStore to STORE.
- Store links to Complete Your Profile.
- Settings is viewer account settings.
- Config owns CS2 configuration.
- Profile owns viewer progression.
- Profile now includes REDEEM CODE and HISTORY UI placeholders; redemption remains stopped until backend activation.
- Admin UI foundation created.
- Top-right account UI foundation created.
- CONNECT TWITCH remains top-right in header and must stay there.

## 17. TOP-RIGHT POSITION RULE
The CONNECT TWITCH/account control must remain at the top-right of the header.
Do not move it.
Current CSS was recently adjusted across:
- index.html
- store/index.html
- settings/index.html
- leaderboard/index.html
- faq/index.html
- donate/index.html
- bonuses/index.html
- config/index.html
- profile/index.html

Current intended account behavior:
- CONNECT TWITCH before login
- avatar + username after login
- dropdown PROFILE / SETTINGS / DISCONNECT

## 18. VISUAL BRAND RULE
Always use existing AdhemSwag visual language:
- #11D9F7 cyan accent
- dark background
- existing border color
- existing card/button treatment
- existing SVG/icon style
- same typography
- same spacing language
- no random new colors
- no random icon packs
- keep MY PROFILE and all navigation icons visually consistent.

## 19. FUTURE KICK ARCHITECTURE — DO NOT IMPLEMENT NOW
Future idea discussed:
- First connection can eventually choose Kick or Twitch.
- One profile can link both.
- Potential future Kick-primary mode.
- If both platforms are open, one shared reward stream prevents double FNC.
But user explicitly said to leave this for later. Do not change current authentication/reward behavior now.

## 20. VERCEL
Do NOT add Vercel just because GitHub is public.
Use GitHub + Supabase where sufficient.
Only add another backend host if an actual technical requirement appears and explain why first.
Supabase Edge Functions are available and may be used for secure webhooks/backend logic.

## 21. NEXT DEVELOPMENT PRIORITIES
Recommended order:
1. Finish secure viewer authentication / Twitch OAuth.
2. Connect viewer identity to Supabase users.
3. Finish profile/settings data flow.
4. Build secure admin authentication and authorization.
5. Finish old StreamElements FNC migration/import workflow and verify balances.
6. Build reward CRUD in admin.
7. Build redemption transaction/idempotency logic.
8. Build history queries/UI.
9. Build redeem-code system.
10. Build Twitch EventSub + watch tracking.
11. Build XP/chat tracking.
12. Build OBS redemption alert.
13. Build new leaderboard.
14. Thoroughly test.
15. Only then consider turning rewards_enabled / points_enabled / xp_enabled ON.

## 22. DO NOT CLAIM
- Do not claim Twitch OAuth is fully working unless tested end-to-end.
- Do not claim FNC/XP are active.
- Do not claim StreamElements old balances are imported; migration is NOT complete.
- Do not claim Admin Panel is fully functional; current UI is foundation only.
- Do not claim Kick rewards are active.
- Do not expose or invent secrets.

## 23. USER COMMUNICATION STYLE
User prefers practical, concise explanations.
User often writes French/DZ Arabic.
When changing the website, execute the change directly when possible rather than only giving instructions.
