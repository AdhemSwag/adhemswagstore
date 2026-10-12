-- Secure, read-only current-period mission enrollment totals for the Admin panel.
-- Only authenticated users listed in admin_users may read the counts.
create or replace function public.get_admin_mission_join_stats()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user_id uuid := auth.uid();
  v_daily_start timestamptz;
  v_weekly_start timestamptz;
  v_daily_count integer := 0;
  v_weekly_count integer := 0;
begin
  if v_user_id is null then
    raise exception 'not_authenticated' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.admin_users a where a.user_id = v_user_id
  ) then
    raise exception 'admin_access_required' using errcode = '42501';
  end if;

  v_daily_start := date_trunc('day', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';
  v_weekly_start := date_trunc('week', now() at time zone 'Africa/Algiers') at time zone 'Africa/Algiers';

  select count(*)::integer into v_daily_count
  from public.mission_period_participants p
  where p.period_type = 'daily' and p.period_start = v_daily_start;

  select count(*)::integer into v_weekly_count
  from public.mission_period_participants p
  where p.period_type = 'weekly' and p.period_start = v_weekly_start;

  return jsonb_build_object(
    'ok', true,
    'timezone', 'Africa/Algiers',
    'daily_count', v_daily_count,
    'weekly_count', v_weekly_count,
    'daily_period_start', v_daily_start,
    'weekly_period_start', v_weekly_start,
    'updated_at', now()
  );
end;
$function$;

revoke all on function public.get_admin_mission_join_stats() from public, anon;
grant execute on function public.get_admin_mission_join_stats() to authenticated;
