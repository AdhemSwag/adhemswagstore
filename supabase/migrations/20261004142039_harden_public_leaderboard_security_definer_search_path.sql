-- Security hardening for public leaderboard SECURITY DEFINER RPCs.
alter function public.get_fnc_leaderboard() set search_path = pg_catalog, public;
alter function public.get_leaderboard_dashboard() set search_path = pg_catalog, public;
alter function public.get_leaderboard_full() set search_path = pg_catalog, public;
alter function public.get_watcher_leaderboard(text) set search_path = pg_catalog, public;
