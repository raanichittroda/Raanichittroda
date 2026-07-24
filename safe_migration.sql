-- SAFE DATABASE MIGRATION SCRIPT FOR RAANI CHITTRODA
-- This script preserves all existing tables and rows without dropping any data.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table if not exists public.categories (
    slug text primary key,
    name text not null,
    image text not null,
    blurb text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS TABLE
create table if not exists public.products (
    id text primary key,
    name text not null,
    category text references public.categories(slug) not null,
    retail_price numeric not null,
    wholesale_price numeric,
    image text not null,
    images jsonb default '[]'::jsonb,
    description text not null,
    weight text,
    purity text,
    seo_title text,
    seo_description text,
    is_new boolean default false,
    is_best_seller boolean default false,
    in_stock boolean default true,
    is_active boolean default true,
    offer_badge text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS TABLE
create table if not exists public.orders (
    id uuid primary key default uuid_generate_v4(),
    customer_name text not null,
    business_name text,
    mobile text not null,
    email text not null,
    gst_number text,
    city text not null,
    state text not null,
    address text not null,
    order_type text not null,
    expected_quantity text,
    total_amount numeric not null,
    note text,
    status text default 'New' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS TABLE
create table if not exists public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id text references public.products(id) not null,
    product_name text not null,
    quantity integer not null,
    price numeric not null
);

-- 5. SETTINGS TABLE (CMS, Hero Slides, About Images, Gallery Images, Global Logo & Favicon)
create table if not exists public.settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security safely
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.settings enable row level security;

-- Policies (Drop existing policy before recreating to avoid duplicate policy error)
do $$ 
begin
    -- Categories
    drop policy if exists "Public can read categories" on public.categories;
    create policy "Public can read categories" on public.categories for select using (true);
    drop policy if exists "Admin can manage categories" on public.categories;
    create policy "Admin can manage categories" on public.categories for all using (true);

    -- Products
    drop policy if exists "Public can read active products" on public.products;
    create policy "Public can read active products" on public.products for select using (true);
    drop policy if exists "Admin can manage products" on public.products;
    create policy "Admin can manage products" on public.products for all using (true);

    -- Settings
    drop policy if exists "Public can read settings" on public.settings;
    create policy "Public can read settings" on public.settings for select using (true);
    drop policy if exists "Admin can manage settings" on public.settings;
    create policy "Admin can manage settings" on public.settings for all using (true);

    -- Orders
    drop policy if exists "Public can insert orders" on public.orders;
    create policy "Public can insert orders" on public.orders for insert with check (true);
    drop policy if exists "Admin can manage orders" on public.orders;
    create policy "Admin can manage orders" on public.orders for all using (true);

    -- Order Items
    drop policy if exists "Public can insert order items" on public.order_items;
    create policy "Public can insert order items" on public.order_items for insert with check (true);
    drop policy if exists "Admin can manage order items" on public.order_items;
    create policy "Admin can manage order items" on public.order_items for all using (true);
end $$;

-- 6. STORAGE SETUP (Bucket for media uploads: categories, products, logo, favicon, hero slider, gallery, about)
insert into storage.buckets (id, name, public) 
values ('media', 'media', true) 
on conflict (id) do update set public = true;

do $$
begin
    drop policy if exists "Public Access" on storage.objects;
    create policy "Public Access" on storage.objects for select using ( bucket_id = 'media' );

    drop policy if exists "Public Upload Media" on storage.objects;
    create policy "Public Upload Media" on storage.objects for insert with check ( bucket_id = 'media' );

    drop policy if exists "Public Update Media" on storage.objects;
    create policy "Public Update Media" on storage.objects for update using ( bucket_id = 'media' );

    drop policy if exists "Public Delete Media" on storage.objects;
    create policy "Public Delete Media" on storage.objects for delete using ( bucket_id = 'media' );
end $$;
