-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS / PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  company_name text,
  role text check (role in ('admin', 'investor')) default 'investor',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. ECONOMIC INDICATORS (Integrated Data Repository)
create table public.economic_indicators (
  id uuid default uuid_generate_v4() primary key,
  metric_name text not null, -- e.g., "GDP Growth", "Inflation Rate"
  value numeric not null,
  unit text not null, -- e.g., "%", "PHP Billions"
  period_year int not null,
  period_quarter int, -- 1, 2, 3, 4 (nullable for annual data)
  category text, -- e.g., "Macroeconomic", "Demographics"
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.economic_indicators enable row level security;

-- Policies for Economic Indicators
create policy "Economic data is viewable by everyone."
  on economic_indicators for select
  using ( true );

create policy "Only admins can insert/update economic data."
  on economic_indicators for all
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );

-- 3. LOCATIONS (GIS Data Points)
create table public.locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  latitude double precision not null,
  longitude double precision not null,
  zoning_type text, -- e.g., "Commercial", "Industrial", "Residential"
  area_sqm numeric,
  status text check (status in ('available', 'occupied', 'under_development')) default 'available',
  details text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.locations enable row level security;

create policy "Locations are viewable by everyone."
  on locations for select
  using ( true );

-- 4. INQUIRIES (Investment Inquiries)
create table public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  location_id uuid references public.locations(id), -- Optional, if inquiring about a specific lot
  subject text not null,
  message text not null,
  investment_range text, -- e.g., "1M-5M", "5M-10M"
  status text check (status in ('pending', 'reviewed', 'responded')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.inquiries enable row level security;

create policy "Users can view their own inquiries."
  on inquiries for select
  using ( auth.uid() = user_id );

create policy "Users can create inquiries."
  on inquiries for insert
  with check ( auth.uid() = user_id );

create policy "Admins can view all inquiries."
  on inquiries for select
  using ( exists ( select 1 from profiles where id = auth.uid() and role = 'admin' ) );
