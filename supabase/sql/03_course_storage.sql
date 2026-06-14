-- ============================================================================
-- Dariva.co LMS — Step 5: course materials storage (applied as migration
-- `course_materials_storage`). Run in Supabase SQL Editor if recreating.
-- ============================================================================

-- Private bucket for course materials (50 MB/file limit — raise if needed for
-- large narrated PowerPoints, in Storage → bucket settings).
insert into storage.buckets (id, name, public, file_size_limit)
values ('course-materials', 'course-materials', false, 52428800)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit;

-- READ: approved students or lecturers only (gates who can list / sign URLs).
drop policy if exists "course materials read" on storage.objects;
create policy "course materials read"
on storage.objects for select to authenticated
using (
  bucket_id = 'course-materials'
  and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and (p.approved or p.role = 'lecturer')
  )
);

-- WRITE (insert / update / delete): lecturers only.
drop policy if exists "course materials insert" on storage.objects;
create policy "course materials insert"
on storage.objects for insert to authenticated
with check ( bucket_id = 'course-materials' and public.is_lecturer() );

drop policy if exists "course materials update" on storage.objects;
create policy "course materials update"
on storage.objects for update to authenticated
using ( bucket_id = 'course-materials' and public.is_lecturer() )
with check ( bucket_id = 'course-materials' and public.is_lecturer() );

drop policy if exists "course materials delete" on storage.objects;
create policy "course materials delete"
on storage.objects for delete to authenticated
using ( bucket_id = 'course-materials' and public.is_lecturer() );
