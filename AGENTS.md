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

## Git Workflow & Quality Assurance Rules (MANDATORY)

### 1. Branch Strategy
- **`main`**: Production-ready branch. **Direct pushes to `main` are strictly forbidden.**
- **`develop`**: Integration and active staging branch.
- **Working Branches**: Every feature, fix, or task MUST be created in a separate branch:
  - `feature/<name>` for new features (e.g., `feature/admin-analytics`)
  - `fix/<issue>` for bug fixes (e.g., `fix/hydration-error`)
  - `refactor/<name>` for code or architecture improvements
  - `chore/<name>` for tooling, config, or documentation updates

### 2. Mandatory Verification Before Push / PR
NEVER commit or push code without verifying the following locally:
1. **TypeScript Typecheck:** Run `./node_modules/.bin/tsc --noEmit` (or `pnpm typecheck`). Must pass with **0 errors**.
2. **Runtime & Build Sanity:** Verify dev server / build compiles without exceptions or broken imports.
3. **Console & Hydration Check:** Ensure no React hydration mismatches, missing props, or console errors are introduced.
4. **End-to-End Verification:** Manually or automatically verify the updated feature (e.g., Firestore CRUD operations, auth flow, form submissions).
5. **Zero Secrets in Git:** Verify that `.env.local`, Firebase private keys, or credentials are NEVER staged.

### 3. Pull Request (PR) & Approval Protocol
- Push working branches to GitHub and open a Pull Request (PR) targeting `develop` (or `main` for releases).
- Follow Conventional Commits in PR titles and commit messages (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- Document in the PR description:
  - Summary of changes
  - Verification checklist completed
  - Proof of functionality (logs, screenshots if UI changed)
- Never merge unverified or failing code.

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
