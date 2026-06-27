-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables to recreate them with the new schema
drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;
drop table if exists public.products cascade;
drop table if exists public.categories cascade;
drop table if exists public.settings cascade;

-- CATEGORIES TABLE
create table public.categories (
    slug text primary key,
    name text not null,
    image text not null,
    blurb text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS TABLE
create table public.products (
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

-- ENQUIRIES / ORDERS TABLE
create table public.orders (
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
    status text default 'New' not null, -- New, Contacted, Quotation Sent, Confirmed, Completed, Cancelled
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDER ITEMS TABLE
create table public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id text references public.products(id) not null,
    product_name text not null,
    quantity integer not null,
    price numeric not null
);

-- SETTINGS TABLE (CMS)
create table public.settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.settings enable row level security;

-- Public can read active products, categories and settings
create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read active products" on public.products for select using (is_active = true);
create policy "Public can read settings" on public.settings for select using (true);

-- Authenticated Admin can manage categories
create policy "Admin can select categories" on public.categories for select using (auth.role() = 'authenticated');
create policy "Admin can insert categories" on public.categories for insert with check (auth.role() = 'authenticated');
create policy "Admin can update categories" on public.categories for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete categories" on public.categories for delete using (auth.role() = 'authenticated');

-- Authenticated Admin can manage products
create policy "Admin can select products" on public.products for select using (auth.role() = 'authenticated');
create policy "Admin can insert products" on public.products for insert with check (auth.role() = 'authenticated');
create policy "Admin can update products" on public.products for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete products" on public.products for delete using (auth.role() = 'authenticated');

-- Authenticated Admin can manage settings
create policy "Admin can select settings" on public.settings for select using (auth.role() = 'authenticated');
create policy "Admin can insert settings" on public.settings for insert with check (auth.role() = 'authenticated');
create policy "Admin can update settings" on public.settings for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete settings" on public.settings for delete using (auth.role() = 'authenticated');

-- Authenticated Admin can manage orders
create policy "Admin can select orders" on public.orders for select using (auth.role() = 'authenticated');
create policy "Admin can update orders" on public.orders for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete orders" on public.orders for delete using (auth.role() = 'authenticated');

-- Authenticated Admin can manage order_items
create policy "Admin can select order_items" on public.order_items for select using (auth.role() = 'authenticated');
create policy "Admin can update order_items" on public.order_items for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete order_items" on public.order_items for delete using (auth.role() = 'authenticated');

-- Public can insert orders (checkout flow)
create policy "Public can insert orders" on public.orders for insert with check (true);
create policy "Public can insert order items" on public.order_items for insert with check (true);

-- STORAGE SETUP
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;

drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Admin Upload" on storage.objects;
drop policy if exists "Admin Update" on storage.objects;
drop policy if exists "Admin Delete" on storage.objects;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'media' );
create policy "Admin Upload" on storage.objects for insert with check ( auth.role() = 'authenticated' AND bucket_id = 'media' );
create policy "Admin Update" on storage.objects for update using ( auth.role() = 'authenticated' AND bucket_id = 'media' );
create policy "Admin Delete" on storage.objects for delete using ( auth.role() = 'authenticated' AND bucket_id = 'media' );
