-- Run this in the Supabase SQL editor for the aarqo-tech project.
-- Google sign-in must be enabled in Authentication > Providers before reviews can be submitted.

create extension if not exists pgcrypto;

create table if not exists public.verified_clients (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint verified_clients_email_lowercase check (email = lower(email)),
  constraint verified_clients_email_format check (position('@' in email) > 1)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null,
  user_email text not null,
  user_avatar text,
  rating integer not null check (rating between 1 and 5),
  review_text text not null check (char_length(trim(review_text)) between 10 and 800),
  created_at timestamptz not null default now(),
  constraint reviews_one_per_user unique (user_id),
  constraint reviews_one_per_email unique (user_email),
  constraint reviews_email_lowercase check (user_email = lower(user_email))
);

create index if not exists reviews_created_at_idx on public.reviews (created_at desc);
create index if not exists reviews_user_email_idx on public.reviews (user_email);
create index if not exists verified_clients_email_idx on public.verified_clients (email);

alter table public.verified_clients enable row level security;
alter table public.reviews enable row level security;

revoke select on public.reviews from anon, authenticated;
grant select (id, user_id, user_name, user_avatar, rating, review_text, created_at)
on public.reviews
to anon, authenticated;
grant insert, update, delete on public.reviews to authenticated;
grant select (email) on public.verified_clients to authenticated;

drop policy if exists "Verified clients can read their own allowlist row" on public.verified_clients;
create policy "Verified clients can read their own allowlist row"
on public.verified_clients
for select
to authenticated
using (email = lower(auth.jwt() ->> 'email'));

drop policy if exists "Anyone can read published reviews" on public.reviews;
create policy "Anyone can read published reviews"
on public.reviews
for select
to anon, authenticated
using (true);

drop policy if exists "Verified clients can create one own review" on public.reviews;
create policy "Verified clients can create one own review"
on public.reviews
for insert
to authenticated
with check (
  auth.uid() = user_id
  and user_email = lower(auth.jwt() ->> 'email')
  and exists (
    select 1
    from public.verified_clients
    where verified_clients.email = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Users can update their own review" on public.reviews;
create policy "Users can update their own review"
on public.reviews
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and user_email = lower(auth.jwt() ->> 'email')
  and exists (
    select 1
    from public.verified_clients
    where verified_clients.email = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Users can delete their own review" on public.reviews;
create policy "Users can delete their own review"
on public.reviews
for delete
to authenticated
using (auth.uid() = user_id);

-- Add verified client emails like this:
-- insert into public.verified_clients (email) values ('client@example.com');
