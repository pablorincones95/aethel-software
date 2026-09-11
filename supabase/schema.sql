-- ═══════════════════════════════════════════════════════════════
-- AETHEL SOFTWARE — Precision Engineering Atelier
-- Database Schema + Row Level Security
-- Run in Supabase SQL Editor or via: supabase db push
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────
-- Table: projects
-- Portfolio projects displayed on the landing page
-- ─────────────────────────────────────────────
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  technologies text[] default '{}',
  url text,
  image_url text,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.projects is 'Portfolio projects for the public landing page';

-- ─────────────────────────────────────────────
-- Table: site_content
-- CMS for editable landing page text sections
-- ─────────────────────────────────────────────
create table public.site_content (
  id uuid default uuid_generate_v4() primary key,
  section_key text unique not null,
  content jsonb not null default '{}',
  updated_at timestamptz default now()
);

comment on table public.site_content is 'Editable content sections for the landing page (CMS)';

-- ─────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────
create index idx_projects_sort_order on public.projects (sort_order);
create index idx_projects_featured on public.projects (is_featured) where is_featured = true;
create index idx_site_content_section_key on public.site_content (section_key);

-- ─────────────────────────────────────────────
-- Updated_at trigger function
-- ─────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_projects
  before update on public.projects
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_site_content
  before update on public.site_content
  for each row execute function public.handle_updated_at();

-- ─────────────────────────────────────────────
-- Row Level Security (RLS)
-- ─────────────────────────────────────────────
alter table public.projects enable row level security;
alter table public.site_content enable row level security;

-- ── Policies: projects ──
-- Public read access (landing page)
create policy "Public read access on projects"
  on public.projects
  for select
  using (true);

-- Authenticated full access (admin CRUD)
create policy "Admin full access on projects"
  on public.projects
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── Policies: site_content ──
-- Public read access (landing page)
create policy "Public read access on site_content"
  on public.site_content
  for select
  using (true);

-- Authenticated full access (admin CMS)
create policy "Admin full access on site_content"
  on public.site_content
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Seed: Initial site_content sections
-- ─────────────────────────────────────────────
insert into public.site_content (section_key, content) values
  ('hero', '{
    "title": "Precision Engineering for Digital Systems",
    "subtitle": "We architect and build high-performance software platforms with the rigor of mission-critical systems.",
    "metrics": [
      {"label": "Projects Delivered", "value": "47+"},
      {"label": "Uptime SLA", "value": "99.97%"},
      {"label": "Avg. Response Time", "value": "<120ms"}
    ]
  }'),
  ('services', '{
    "title": "Specialized Engineering Services",
    "subtitle": "Full-spectrum software architecture and development for enterprise-grade applications.",
    "items": [
      {"title": "Web & SaaS", "description": "Full-stack applications with Next.js, React, and cloud-native backends.", "icon": "monitor"},
      {"title": "Mobile Engineering", "description": "Cross-platform mobile applications using React Native and Angular.", "icon": "smartphone"},
      {"title": "Cloud & DevOps", "description": "Infrastructure as code, CI/CD pipelines, and cloud architecture on AWS/GCP.", "icon": "cloud"},
      {"title": "API & Integration", "description": "RESTful and GraphQL APIs, microservices, and third-party system integration.", "icon": "link"}
    ]
  }'),
  ('process', '{
    "title": "Engineering Process",
    "subtitle": "A disciplined methodology refined through years of mission-critical delivery.",
    "phases": [
      {"number": "01", "title": "Discovery & Analysis", "description": "Deep-dive into requirements, system constraints, and architectural boundaries."},
      {"number": "02", "title": "Architecture & Design", "description": "Technical specifications, system diagrams, and technology stack selection."},
      {"number": "03", "title": "Iterative Build", "description": "Sprint-based development with continuous integration and automated testing."},
      {"number": "04", "title": "Deploy & Monitor", "description": "Production deployment, performance monitoring, and operational readiness."}
    ]
  }'),
  ('contact', '{
    "title": "Start a Conversation",
    "subtitle": "Ready to architect your next system? Let us discuss your technical requirements.",
    "email": "engineering@aethel.software",
    "response_time": "24h"
  }')
on conflict (section_key) do nothing;
