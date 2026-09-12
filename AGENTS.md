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
- **Database & Auth:** Google Firebase (Cloud Firestore + Firebase Auth via `firebase` & `firebase-admin`)
- **Package Manager:** pnpm

## Architecture
```
/ → Landing page (custom components, NO shadcn/ui)
/admin → Admin panel (shadcn/ui, protected with Firebase Auth)
components/ui/ → shadcn/ui components (admin ONLY)
components/landing/ → Custom landing components
lib/firebase/ → Firebase clients (browser + admin server)
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
- Components: kebab-case (`hero.tsx`, `project-form.tsx`)
- Utilities: camelCase (`formatDate.ts`)

### Firebase
- Server Admin SDK (`lib/firebase/admin.ts`) for Server Components and Server Actions
- Browser client (`lib/firebase/client.ts`) for Client Components
- Auth session verified via secure HTTP-Only cookie `aethel_session`
- Firestore collections: `projects`, `site_content`, `contact_leads`

### Security
- Never expose service account private keys in client code
- Security rules defined in `firestore.rules`
- Admin routes protected via middleware session guard

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
| `lib/firebase/client.ts` | Browser Firebase client |
| `lib/firebase/admin.ts` | Server Firebase Admin SDK |
| `middleware.ts` | Session cookie verification + /admin guard |
| `firestore.rules` | Cloud Firestore security rules |
| `SETUP_GUIDE.md` | Complete Firebase & Resend setup guide |
| `DESIGN.md` | Complete design system documentation |
