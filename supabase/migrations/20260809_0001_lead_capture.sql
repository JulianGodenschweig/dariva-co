-- Dariva.co lead capture — BRIEF.md §10.
--
-- Four tables, RLS on every one, default deny. The anon role gets INSERT and
-- nothing else: no SELECT, no UPDATE, no DELETE, anywhere. Reads happen only
-- through the Supabase dashboard or a service-role context that never touches
-- a client component.
--
-- CVE-2025-48757 (May 2025) found 170 AI-built projects leaking user data to
-- unauthenticated requests because RLS was left off. The anonymous-SELECT
-- denial here is asserted by an automated test, not assumed.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Shared enums
-- ---------------------------------------------------------------------------

do $$ begin
  create type public.lead_status as enum ('new', 'contacted', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.rate_type as enum ('standard', 'subsidised');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- enquiries — the general contact form
-- ---------------------------------------------------------------------------

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 254),
  phone         text check (char_length(phone) <= 40),
  org           text check (char_length(org) <= 160),
  audience_type text check (char_length(audience_type) <= 60),
  message       text not null check (char_length(message) between 1 and 4000),
  source_page   text check (char_length(source_page) <= 200),
  status        public.lead_status not null default 'new'
);

-- ---------------------------------------------------------------------------
-- programme_interest — "join the next cohort"
-- ---------------------------------------------------------------------------

create table if not exists public.programme_interest (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) between 3 and 254),
  phone      text check (char_length(phone) <= 40),
  region     text check (char_length(region) <= 120),
  programme  text not null check (char_length(programme) between 1 and 120),
  rate_type  public.rate_type not null default 'standard',
  status     public.lead_status not null default 'new'
);

-- ---------------------------------------------------------------------------
-- partner_enquiries
-- ---------------------------------------------------------------------------

create table if not exists public.partner_enquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  org_name         text not null check (char_length(org_name) between 1 and 160),
  contact_name     text not null check (char_length(contact_name) between 1 and 120),
  email            text not null check (char_length(email) between 3 and 254),
  phone            text check (char_length(phone) <= 40),
  partnership_type text check (char_length(partnership_type) <= 60),
  message          text not null check (char_length(message) between 1 and 4000),
  status           public.lead_status not null default 'new'
);

-- ---------------------------------------------------------------------------
-- newsletter
-- ---------------------------------------------------------------------------

create table if not exists public.newsletter (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null unique check (char_length(email) between 3 and 254),
  confirmed  boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Row level security: on, default deny, INSERT-only for anon.
--
-- Enabling RLS with no SELECT policy is what makes anonymous reads return zero
-- rows. The explicit revokes below make that true at the privilege layer too,
-- so a future policy added by mistake cannot silently open reads.
-- ---------------------------------------------------------------------------

do $$
declare t text;
begin
  foreach t in array array[
    'enquiries', 'programme_interest', 'partner_enquiries', 'newsletter'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);

    execute format('revoke all on public.%I from anon, authenticated', t);
    execute format('grant insert on public.%I to anon', t);

    execute format(
      'drop policy if exists %I on public.%I', 'anon_insert_only_' || t, t
    );
    execute format(
      'create policy %I on public.%I for insert to anon with check (true)',
      'anon_insert_only_' || t, t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Per-IP rate limiting.
--
-- The app hashes the client IP with a server-only secret before it gets here,
-- so this table never stores an address. SECURITY DEFINER because anon has no
-- privileges on it at all — the only way in is this function.
-- ---------------------------------------------------------------------------

create table if not exists public.submission_throttle (
  ip_hash    text primary key,
  window_start timestamptz not null default now(),
  hits       integer not null default 0
);

alter table public.submission_throttle enable row level security;
revoke all on public.submission_throttle from anon, authenticated;

create or replace function public.check_rate_limit(
  p_ip_hash text,
  p_limit   integer default 5,
  p_window  interval default interval '10 minutes'
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_hits integer;
begin
  insert into public.submission_throttle as s (ip_hash, window_start, hits)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update
    set hits = case
          when s.window_start < now() - p_window then 1
          else s.hits + 1
        end,
        window_start = case
          when s.window_start < now() - p_window then now()
          else s.window_start
        end
  returning hits into v_hits;

  -- true = allowed
  return v_hits <= p_limit;
end $$;

revoke all on function public.check_rate_limit(text, integer, interval) from public;
grant execute on function public.check_rate_limit(text, integer, interval) to anon;

-- Housekeeping index for the dashboard's "newest first" view.
create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
create index if not exists programme_interest_created_at_idx
  on public.programme_interest (created_at desc);
create index if not exists partner_enquiries_created_at_idx
  on public.partner_enquiries (created_at desc);
