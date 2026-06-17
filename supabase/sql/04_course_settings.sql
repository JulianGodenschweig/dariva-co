-- ============================================================================
-- Dariva.co LMS — course_settings (per-course live class link).
-- Applied as migration `course_settings_live_link`.
-- ============================================================================

create table if not exists public.course_settings (
  slug        text primary key,
  live_url    text,
  updated_at  timestamptz not null default now()
);

-- Embedded live class (Jitsi) room name. Migration `course_settings_live_room`.
alter table public.course_settings add column if not exists live_room text;

alter table public.course_settings enable row level security;
grant select, insert, update on public.course_settings to authenticated;

-- READ: approved students or lecturers.
drop policy if exists "course_settings read" on public.course_settings;
create policy "course_settings read" on public.course_settings for select to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and (p.approved or p.role = 'lecturer')
  )
);

-- WRITE: lecturers only.
drop policy if exists "course_settings insert" on public.course_settings;
create policy "course_settings insert" on public.course_settings for insert to authenticated
with check ( public.is_lecturer() );

drop policy if exists "course_settings update" on public.course_settings;
create policy "course_settings update" on public.course_settings for update to authenticated
using ( public.is_lecturer() ) with check ( public.is_lecturer() );
