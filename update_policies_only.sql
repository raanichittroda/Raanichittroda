-- SAFE MIGRATION: Update RLS Policies only (Does not drop tables)

-- 1. Drop existing policies
drop policy if exists "Admin can manage categories" on public.categories;
drop policy if exists "Admin can manage products" on public.products;
drop policy if exists "Admin can manage orders" on public.orders;
drop policy if exists "Admin can manage order_items" on public.order_items;
drop policy if exists "Admin can manage settings" on public.settings;

-- 2. Apply new granular policies for Categories
create policy "Admin can select categories" on public.categories for select using (auth.role() = 'authenticated');
create policy "Admin can insert categories" on public.categories for insert with check (auth.role() = 'authenticated');
create policy "Admin can update categories" on public.categories for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete categories" on public.categories for delete using (auth.role() = 'authenticated');

-- 3. Apply new granular policies for Products
create policy "Admin can select products" on public.products for select using (auth.role() = 'authenticated');
create policy "Admin can insert products" on public.products for insert with check (auth.role() = 'authenticated');
create policy "Admin can update products" on public.products for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete products" on public.products for delete using (auth.role() = 'authenticated');

-- 4. Apply new granular policies for Settings
create policy "Admin can select settings" on public.settings for select using (auth.role() = 'authenticated');
create policy "Admin can insert settings" on public.settings for insert with check (auth.role() = 'authenticated');
create policy "Admin can update settings" on public.settings for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete settings" on public.settings for delete using (auth.role() = 'authenticated');

-- 5. Apply new granular policies for Orders
create policy "Admin can select orders" on public.orders for select using (auth.role() = 'authenticated');
create policy "Admin can update orders" on public.orders for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete orders" on public.orders for delete using (auth.role() = 'authenticated');

-- 6. Apply new granular policies for Order Items
create policy "Admin can select order_items" on public.order_items for select using (auth.role() = 'authenticated');
create policy "Admin can update order_items" on public.order_items for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin can delete order_items" on public.order_items for delete using (auth.role() = 'authenticated');
