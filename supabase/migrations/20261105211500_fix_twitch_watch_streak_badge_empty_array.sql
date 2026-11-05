create or replace function public.get_twitch_watch_streak_badges(p_twitch_username text)
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    array_agg('streak_' || a.milestone::text order by a.milestone)
      filter (where a.milestone is not null),
    array[]::text[]
  )
  from public.users u
  left join private.twitch_watch_streak_awards a on a.user_id = u.id
  where lower(u.twitch_username) = lower(trim(p_twitch_username))
    and (
      (
        auth.uid() is not null
        and exists (select 1 from public.admin_users admin where admin.user_id = auth.uid())
      )
      or (
        u.profile_complete = true
        and coalesce(u.is_blocked, false) = false
        and not exists (select 1 from public.admin_users target_admin where target_admin.user_id = u.id)
      )
    )
  limit 1;
$$;
revoke all on function public.get_twitch_watch_streak_badges(text) from public;
grant execute on function public.get_twitch_watch_streak_badges(text) to anon, authenticated;