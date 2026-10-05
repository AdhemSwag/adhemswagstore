-- Add durable per-user rate limiting for sensitive redemption endpoints.

create table if not exists public.security_rate_limits (
  user_id uuid not null,
  action text not null,
  last_request_at timestamptz not null default now(),
  primary key (user_id, action)
);

alter table public.security_rate_limits enable row level security;
revoke all on table public.security_rate_limits from public, anon, authenticated;

create or replace function public.check_security_rate_limit(
  p_user_id uuid,
  p_action text,
  p_min_interval_seconds integer default 3
)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := now();
  v_ok boolean;
begin
  if p_user_id is null or nullif(trim(p_action),'') is null then
    return false;
  end if;

  insert into public.security_rate_limits(user_id,action,last_request_at)
  values(p_user_id,p_action,v_now)
  on conflict (user_id,action) do update
    set last_request_at=excluded.last_request_at
    where public.security_rate_limits.last_request_at <=
      v_now - make_interval(secs=>greatest(p_min_interval_seconds,1))
  returning true into v_ok;

  return coalesce(v_ok,false);
end;
$$;

revoke all on function public.check_security_rate_limit(uuid,text,integer) from public, anon, authenticated;
grant execute on function public.check_security_rate_limit(uuid,text,integer) to service_role;
