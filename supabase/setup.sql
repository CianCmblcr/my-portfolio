-- Run once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- Before running, replace YOUR_ADMIN_EMAIL (3 places) with the email of the
-- user you create under Authentication > Users. Only that account can edit.

-- Site content: one row ("main") holding the whole site as JSON.
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content"
  on public.site_content for select
  using (true);

drop policy if exists "Admin can write site content" on public.site_content;
create policy "Admin can write site content"
  on public.site_content for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

-- Uploaded images: a public bucket anyone can view, only the admin can change.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Admin can manage media" on storage.objects;
create policy "Admin can manage media"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'media' and (auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL')
  with check (bucket_id = 'media' and (auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');
