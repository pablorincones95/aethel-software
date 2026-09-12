<!-- BEGIN:nextjs-agent-rules -->
<!-- This block is auto-managed by Next.js. Do not modify. -->
<!-- END:nextjs-agent-rules -->

# Aethel Software — Agent Instructions

## Overview
Corporate website and admin panel for Aethel Software, built with the **Precision Engineering Atelier** design system.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first config — NO tailwind.config.ts)
- **Components:** shadcn/ui (new-york style, Radix primitives)
- **Database:** Supabase (PostgreSQL + Supabase Auth)
- **Package Manager:** pnpm

## Architecture
```
/ → Landing page (custom components, NO shadcn/ui)
/admin → Admin panel (shadcn/ui, protected with Supabase Auth)
components/ui/ → shadcn/ui components (admin ONLY)
components/landing/ → Custom landing components (to be designed later)
lib/supabase/ → Supabase clients (browser + server)
```

## Design System: Precision Engineering Atelier
- All tokens defined in `app/globals.css` (CSS variables + @theme inline)
- Dark-mode only: canvas-void `#030712`, surface `#0e131f`
- Primary: Electric Cyan `#00E5FF` / `#c3f5ff`
- Secondary: Champagne Gold `#E2C974` / `#dec571`
- Fonts: Space Grotesk (display/labels), Hanken Grotesk (body)
- Elevation: 4-layer system (glassmorphism, micro-hairlines, NO shadows)
- See `DESIGN.md` for complete specifications

## Conventions

### Code Style
- Server Components by default; `"use client"` only when Web API access is needed
- Named exports for all components
- `cn()` utility for conditional/merged Tailwind classes
- CSS variables for theming — NEVER use raw Tailwind colors for status/brand
- TypeScript interfaces over types; avoid enums

### File Naming
- Pages: `page.tsx` | Layouts: `layout.tsx` | API Routes: `route.ts`
- Components: kebab-case (`hero.tsx`, `projects-table.tsx`)
- Utilities: camelCase (`formatDate.ts`)

### Supabase
- Server client (`lib/supabase/server.ts`) for Server Components and Server Actions
- Browser client (`lib/supabase/client.ts`) for Client Components only
- Auth verified via `supabase.auth.getUser()` (NOT `getSession()`)
- Middleware refreshes tokens automatically on every request

### Security
- Never expose `service_role` key or secrets in client code
- RLS enabled on all tables — policies defined in `supabase/schema.sql`
- Admin routes protected via middleware auth guard
- Use `app_metadata` for authorization, NOT `user_metadata`

### Styling (shadcn/ui Components)
- Use semantic tokens: `bg-primary-container`, `text-on-surface`, etc.
- Use `size-*` instead of separate `w-* h-*`
- Use `gap-*` instead of `space-x-*` / `space-y-*`
- Utility classes available: `.elevation-1`, `.glass`, `.glow-cyan`, `.glow-gold`, `.text-label-caps`, `.tabular-nums`

## Key Files Reference
| File | Purpose |
|------|---------|
| `app/globals.css` | All design tokens, typography, elevation, glassmorphism |
| `components.json` | shadcn/ui configuration |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client (cookies) |
| `middleware.ts` | Auth token refresh + /admin guard |
| `supabase/schema.sql` | Database DDL + RLS policies |
| `DESIGN.md` | Complete design system documentation |
