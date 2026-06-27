-- SAFE MIGRATION: Create Product Media Table

create table if not exists public.product_media (
    id uuid primary key default uuid_generate_v4(),
    product_id text references public.products(id) on delete cascade not null,
    media_type text not null, -- 'image' or 'video'
    file_url text not null,
    thumbnail_url text,
    display_order integer not null default 0,
    is_cover boolean not null default false,
    file_size integer,
    width integer,
    height integer,
    duration numeric,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.product_media enable row level security;

-- Public can read all media
create policy "Public can read product media" on public.product_media for select using (true);

-- Admin can manage media
create policy "Admin can insert product media" on public.product_media for insert with check (auth.role() = 'authenticated');
create policy "Admin can update product media" on public.product_media for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete product media" on public.product_media for delete using (auth.role() = 'authenticated');

-- Additional Storage Policy (If not already present, ensures Admin can upload to products folder)
-- (Your existing "Admin Upload" on storage.objects should already handle this if it allows bucket_id = 'media')
