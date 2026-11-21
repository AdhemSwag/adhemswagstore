-- Keep profile eligibility aligned with Twitch-only FNC earning rules.
-- A profile is complete only when Twitch is linked and all required profile fields exist.

create or replace function public.set_profile_complete()
returns trigger
language plpgsql
set search_path = pg_catalog
as $function$
begin
  new.profile_complete := (
    nullif(btrim(new.twitch_user_id), '') is not null
    and nullif(btrim(new.email), '') is not null
    and nullif(btrim(new.steam_profile_url), '') is not null
    and nullif(btrim(new.steam_trade_url), '') is not null
    and nullif(btrim(new.discord_username), '') is not null
  );
  return new;
end;
$function$;

create or replace function public.protect_user_reward_fields()
returns trigger
language plpgsql
set search_path = public
as $function$
declare
  jwt_role text := current_setting('request.jwt.claim.role', true);
begin
  if jwt_role in ('anon', 'authenticated') then
    if tg_op = 'INSERT' then
      if new.fnc_points <> 0
         or new.xp <> 0
         or new.level <> 1
         or new.total_watch_minutes <> 0
         or new.monthly_xp <> 0
         or new.streak <> 0
         or new.is_blocked <> false
         or new.total_fnc_earned <> 0
         or new.profile_complete <> false then
        raise exception 'Protected user reward fields can only be set by the trusted backend';
      end if;
    elsif tg_op = 'UPDATE' then
      new.fnc_points := old.fnc_points;
      new.xp := old.xp;
      new.level := old.level;
      new.total_watch_minutes := old.total_watch_minutes;
      new.monthly_xp := old.monthly_xp;
      new.streak := old.streak;
      new.is_blocked := old.is_blocked;
      new.total_fnc_earned := old.total_fnc_earned;
    end if;

    new.profile_complete :=
      nullif(btrim(new.twitch_user_id), '') is not null
      and new.email is not null and btrim(new.email) <> ''
      and new.steam_profile_url is not null and btrim(new.steam_profile_url) <> ''
      and new.steam_trade_url is not null and btrim(new.steam_trade_url) <> ''
      and new.discord_username is not null and btrim(new.discord_username) <> '';
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_set_profile_complete on public.users;
create trigger trg_set_profile_complete
before insert or update of twitch_user_id, email, steam_profile_url, steam_trade_url, discord_username
on public.users
for each row execute function public.set_profile_complete();
