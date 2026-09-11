-- ITOLOGY initial schema
-- Run via: supabase migration up  (or paste into the Supabase SQL editor)

create extension if not exists "pgcrypto";

-- ---------- People ----------

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  line1 text not null,
  line2 text,
  city text not null,
  region text,
  postal_code text,
  country text not null,
  is_default boolean not null default false
);

-- ---------- Catalog ----------

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text
);

create table if not exists attributes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  input_type text not null default 'select' check (input_type in ('select', 'range', 'boolean'))
);

create table if not exists attribute_values (
  id uuid primary key default gen_random_uuid(),
  attribute_id uuid not null references attributes(id) on delete cascade,
  value text not null
);

create table if not exists category_attributes (
  category_id uuid not null references categories(id) on delete cascade,
  attribute_id uuid not null references attributes(id) on delete cascade,
  is_filterable boolean not null default true,
  primary key (category_id, attribute_id)
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid references brands(id) on delete set null,
  category_id uuid not null references categories(id) on delete restrict,
  sku text not null unique,
  description text,
  price int not null check (price >= 0),        -- stored in cents
  sale_price int check (sale_price >= 0),
  stock_qty int not null default 0,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  is_new boolean not null default false,
  warranty_text text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text not null unique,
  price_delta int not null default 0,
  stock_qty int not null default 0
);

create table if not exists product_variant_attributes (
  variant_id uuid not null references product_variants(id) on delete cascade,
  attribute_id uuid not null references attributes(id) on delete cascade,
  attribute_value_id uuid not null references attribute_values(id) on delete cascade,
  primary key (variant_id, attribute_id)
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0
);

create table if not exists product_attributes (
  product_id uuid not null references products(id) on delete cascade,
  attribute_id uuid not null references attributes(id) on delete cascade,
  attribute_value_id uuid not null references attribute_values(id) on delete cascade,
  primary key (product_id, attribute_id)
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Commerce ----------

create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  session_id text,
  created_at timestamptz not null default now()
);

create table if not exists cart_items (
  cart_id uuid not null references carts(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  variant_id uuid references product_variants(id) on delete set null,
  qty int not null check (qty > 0),
  primary key (cart_id, product_id, variant_id)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','paid','refunded','failed')),
  shipping_status text not null default 'unfulfilled'
    check (shipping_status in ('unfulfilled','shipped','delivered')),
  subtotal int not null,
  discount int not null default 0,
  total int not null,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  variant_id uuid references product_variants(id) on delete set null,
  qty int not null check (qty > 0),
  unit_price int not null
);

create table if not exists wishlists (
  customer_id uuid not null references customers(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  primary key (customer_id, product_id)
);

create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  type text not null check (type in ('percent', 'fixed')),
  value int not null,
  starts_at timestamptz,
  ends_at timestamptz
);

-- ---------- Services & content ----------

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order int not null default 0
);

create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  content_json jsonb not null default '{}'::jsonb
);

-- ---------- Roles ----------

create table if not exists user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'staff', 'admin'))
);

-- ---------- Row Level Security ----------

alter table products enable row level security;
alter table categories enable row level security;
alter table brands enable row level security;
alter table reviews enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table customers enable row level security;
alter table wishlists enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;

-- Public catalog is readable by anyone.
create policy "Published products are public" on products
  for select using (is_published = true);
create policy "Active categories are public" on categories
  for select using (is_active = true);
create policy "Brands are public" on brands
  for select using (true);
create policy "Approved reviews are public" on reviews
  for select using (is_approved = true);

-- Customers can only see/manage their own records.
create policy "Customers see their own orders" on orders
  for select using (
    customer_id in (select id from customers where user_id = auth.uid())
  );
create policy "Customers see their own order items" on order_items
  for select using (
    order_id in (
      select id from orders where customer_id in (
        select id from customers where user_id = auth.uid()
      )
    )
  );
create policy "Customers manage their own record" on customers
  for all using (user_id = auth.uid());
create policy "Customers manage their own wishlist" on wishlists
  for all using (
    customer_id in (select id from customers where user_id = auth.uid())
  );
create policy "Customers manage their own cart" on carts
  for all using (
    customer_id in (select id from customers where user_id = auth.uid())
    or session_id = current_setting('request.jwt.claim.session_id', true)
  );
create policy "Customers manage their own cart items" on cart_items
  for all using (
    cart_id in (select id from carts where customer_id in (
      select id from customers where user_id = auth.uid()
    ))
  );

-- Admin/staff write access (products/categories/brands editable via
-- service-role in Server Actions, or via this role check for direct writes).
create policy "Admins manage products" on products
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins manage categories" on categories
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins manage brands" on brands
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role in ('admin','staff'))
  );
