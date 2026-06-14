-- ============================================================================
-- Dariva.co LMS — Step 1: profiles table + Row Level Security
-- Run in the Supabase Dashboard → SQL Editor → New query → Run.
-- Idempotent: safe to run more than once.
-- ============================================================================

-- 1) profiles table ----------------------------------------------------------
create table if not exists public.profiles (
  id          uuid        primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  role        text        not null default 'student'
                          check (role in ('student', 'lecturer')),
  approved    boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- 2) enable Row Level Security ----------------------------------------------
alter table public.profiles enable row level security;

-- Ensure the API role can reach the table (RLS still filters which ROWS show).
grant select, update on public.profiles to authenticated;

-- 3) is_lecturer(): SECURITY DEFINER on purpose -----------------------------
-- The lecturer policies below need to know the caller's role. If they queried
-- `profiles` directly inside a `profiles` policy, evaluating that query would
-- re-trigger the same policy => infinite recursion. Running the lookup in a
-- SECURITY DEFINER function bypasses RLS for this one internal check only.
-- It reads auth.uid() (the caller), so it can only ever report on yourself.
create or replace function public.is_lecturer()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'lecturer'
  );
$$;

-- Only signed-in users ever need it (all policies are TO authenticated).
revoke execute on function public.is_lecturer() from public, anon;
grant  execute on function public.is_lecturer() to authenticated;

-- 4) policies ----------------------------------------------------------------
-- Everyone signed in: read your OWN row.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles
  for select
  to authenticated
  using ( (select auth.uid()) = id );

-- Lecturers: read ALL rows (needed for the /admin pending list in Step 4).
drop policy if exists "lecturers read all profiles" on public.profiles;
create policy "lecturers read all profiles"
  on public.profiles
  for select
  to authenticated
  using ( public.is_lecturer() );

-- Lecturers: UPDATE rows (approve students). Students have NO update policy,
-- so they cannot flip their own `approved` flag. Both USING and WITH CHECK set.
drop policy if exists "lecturers update profiles" on public.profiles;
create policy "lecturers update profiles"
  on public.profiles
  for update
  to authenticated
  using ( public.is_lecturer() )
  with check ( public.is_lecturer() );

-- 5) auto-create a profile row when a new auth user signs up -----------------
-- full_name is pulled from signup metadata for DISPLAY only (never authz).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ============================================================================
-- Quick verify (optional):
--   select * from public.profiles;                                   -- exists, empty
--   select relrowsecurity from pg_class where relname = 'profiles';  -- t (true)
--   select polname from pg_policies where tablename = 'profiles';    -- 3 policies
-- ============================================================================

-- ----------------------------------------------------------------------------
-- LATER (NOT NOW): after your 2 lecturer accounts sign up in Step 2, promote
-- each one (run once per lecturer, swap in the real email):
--
--   update public.profiles
--   set role = 'lecturer', approved = true
--   where email = 'lecturer@dariva.co';
-- ----------------------------------------------------------------------------
