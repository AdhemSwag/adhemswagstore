-- Add the two additional conservative Twitch-only watch missions.
insert into public.missions
  (id, title, description, period_type, goal_minutes, xp_reward, fnc_reward, active, display_order)
values
  ('twitch_daily_15', 'Quick Check-in', 'Watch at least 15 verified minutes on Twitch today.', 'daily', 15, 5, 1, true, 5),
  ('twitch_weekly_120', 'Weekly Warm-up', 'Reach 120 verified Twitch watch minutes this week.', 'weekly', 120, 25, 3, true, 15)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  period_type = excluded.period_type,
  goal_minutes = excluded.goal_minutes,
  xp_reward = excluded.xp_reward,
  fnc_reward = excluded.fnc_reward,
  active = excluded.active,
  display_order = excluded.display_order;
