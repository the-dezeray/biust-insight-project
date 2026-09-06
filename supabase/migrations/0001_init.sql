-- ============================================================
-- BIUST Insight - Supabase schema
-- Run this in the Supabase Dashboard: SQL Editor > New query
-- ============================================================

-- ---------- Tables ----------

create table if not exists public.subjects (
  id          text primary key,              -- e.g. 'computer-science'
  name        text not null,
  prefix      text not null unique,          -- e.g. 'COMP'
  icon        text not null default 'Folder',
  description text not null default '',
  color       text not null default '',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.courses (
  id         bigint generated always as identity primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  code       text not null unique,           -- e.g. 'ALSS 101'
  title      text not null,
  college    text not null default '',
  year       text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id          bigint generated always as identity primary key,
  course_id   bigint not null references public.courses(id) on delete cascade,
  title       text   not null,
  category    text   not null default 'exam',  -- exam|test|quiz|supplementary|special|notes|assignment
  year        text,
  file_path   text   not null,            -- storage path in 'course-content' bucket, or an external URL
  file_type   text,
  file_size   bigint,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ---------- Indexes ----------

create index if not exists courses_subject_id_idx   on public.courses (subject_id);
create index if not exists documents_course_id_idx  on public.documents (course_id);
create index if not exists documents_category_idx   on public.documents (category);
create index if not exists documents_year_idx       on public.documents (year);

-- ---------- Full-text search ----------

alter table public.documents
  add column if not exists fts tsvector
  generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(year, '') || ' ' || coalesce(category, ''))
  ) stored;

create index if not exists documents_fts_idx on public.documents using gin (fts);

-- Course code is searched alongside the document title, so index it too.
create index if not exists courses_code_trgm_idx on public.courses using gin (code gin_trgm_ops);
create extension if not exists pg_trgm;

-- ---------- Row Level Security ----------
-- Reads require a logged-in user. Writes go through server actions that use
-- the service-role key (bypasses RLS), or by admins via the insert policies.

alter table public.subjects  enable row level security;
alter table public.courses   enable row level security;
alter table public.documents enable row level security;

drop policy if exists "Authenticated read subjects" on public.subjects;
create policy "Authenticated read subjects" on public.subjects
  for select to authenticated using (true);

drop policy if exists "Authenticated read courses" on public.courses;
create policy "Authenticated read courses" on public.courses
  for select to authenticated using (true);

drop policy if exists "Authenticated read documents" on public.documents;
create policy "Authenticated read documents" on public.documents
  for select to authenticated using (true);

-- Admin insert policy: users with raw_user_meta_data->>'role' = 'admin'
drop policy if exists "Admins insert courses" on public.courses;
create policy "Admins insert courses" on public.courses
  for insert to authenticated with check (
    exists (select 1 from auth.users u where u.id = auth.uid() and u.raw_user_meta_data->>'role' = 'admin')
  );

drop policy if exists "Admins insert documents" on public.documents;
create policy "Admins insert documents" on public.documents
  for insert to authenticated with check (
    exists (select 1 from auth.users u where u.id = auth.uid() and u.raw_user_meta_data->>'role' = 'admin')
  );

-- ---------- Storage ----------
-- Private bucket for course files. Access only via signed URLs.

insert into storage.buckets (id, name, public)
values ('course-content', 'course-content', false)
on conflict (id) do nothing;

drop policy if exists "Authenticated download course content" on storage.objects;
create policy "Authenticated download course content" on storage.objects
  for select to authenticated
  using (bucket_id = 'course-content');

drop policy if exists "Admins upload course content" on storage.objects;
create policy "Admins upload course content" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'course-content'
    and exists (select 1 from auth.users u where u.id = auth.uid() and u.raw_user_meta_data->>'role' = 'admin')
  );

drop policy if exists "Admins update course content" on storage.objects;
create policy "Admins update course content" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'course-content'
    and exists (select 1 from auth.users u where u.id = auth.uid() and u.raw_user_meta_data->>'role' = 'admin')
  );

drop policy if exists "Admins delete course content" on storage.objects;
create policy "Admins delete course content" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'course-content'
    and exists (select 1 from auth.users u where u.id = auth.uid() and u.raw_user_meta_data->>'role' = 'admin')
  );
