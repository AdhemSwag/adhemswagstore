-- Add two conservative Twitch watch missions for additional daily and weekly goals.
insert into public.missions
  (id, title, description, period_type, goal_minutes, xp_reward, fnc_reward, active, display_order)
values
  ('twitch_daily_60', 'Daily Watch Streak', 'Watch at least 60 verified minutes on Twitch today.', 'daily', 60, 20, 2, true, 20),
  ('twitch_weekly_300', 'Weekly Watch Streak', 'Reach 300 verified Twitch watch minutes this week.', 'weekly', 300, 75, 8, true, 40)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  period_type = excluded.period_type,
  goal_minutes = excluded.goal_minutes,
  xp_reward = excluded.xp_reward,
  fnc_reward = excluded.fnc_reward,
  active = excluded.active,
  display_order = excluded.display_order,
  updated_at = now();
