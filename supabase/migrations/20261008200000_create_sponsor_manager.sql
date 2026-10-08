-- Sponsor Manager schema
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  target_url text,
  promo_code text,
  position text not null default 'left' check (position in ('left','right')),
  enabled boolean not null default false,
  show_all_pages boolean not null default true,
  closeable boolean not null default true,
  start_at timestamptz,
  end_at timestamptz,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists sponsors_active_idx on public.sponsors (enabled,start_at,end_at);
create or replace function public.is_admin_user()
returns boolean language sql security definer set search_path=public stable as $$
  select exists(select 1 from public.admin_users where user_id=auth.uid());
$$;
revoke all on function public.is_admin_user() from public;
grant execute on function public.is_admin_user() to authenticated;
alter table public.sponsors enable row level security;
drop policy if exists "public can view active sponsors" on public.sponsors;
create policy "public can view active sponsors" on public.sponsors for select to anon,authenticated
using(enabled=true and (start_at is null or start_at<=now()) and (end_at is null or end_at>now()));
drop policy if exists "admins can manage sponsors" on public.sponsors;
create policy "admins can manage sponsors" on public.sponsors for all to authenticated
using((select public.is_admin_user())) with check((select public.is_admin_user()));
grant select on public.sponsors to anon,authenticated;
grant insert,update,delete on public.sponsors to authenticated;
create or replace function public.record_sponsor_impression(p_sponsor_id uuid)
returns void language sql security definer set search_path=public as $$
  update public.sponsors set impressions=impressions+1,updated_at=now()
  where id=p_sponsor_id and enabled=true and (start_at is null or start_at<=now()) and (end_at is null or end_at>now());
$$;
create or replace function public.record_sponsor_click(p_sponsor_id uuid)
returns void language sql security definer set search_path=public as $$
  update public.sponsors set clicks=clicks+1,updated_at=now()
  where id=p_sponsor_id and enabled=true and (start_at is null or start_at<=now()) and (end_at is null or end_at>now());
$$;
revoke all on function public.record_sponsor_impression(uuid) from public;
revoke all on function public.record_sponsor_click(uuid) from public;
grant execute on function public.record_sponsor_impression(uuid) to anon,authenticated;
grant execute on function public.record_sponsor_click(uuid) to anon,authenticated;
