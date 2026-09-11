# Aethel Software

> Precision Engineering Atelier — Corporate platform & admin panel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (admin) + SCSS ITCSS (landing)
- **Components:** shadcn/ui (admin) + Custom SCSS Modules (landing)
- **Database:** Supabase (PostgreSQL + Auth)
- **Package Manager:** pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
pnpm dev
```

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin panel (protected)
│   └── page.tsx            # Landing page
├── components/ui/          # shadcn/ui (admin only)
├── styles/                 # SCSS ITCSS (landing)
│   ├── 0-config/           # Design tokens
│   ├── 1-tools/            # Mixins & functions
│   ├── 2-generic/          # Reset & base
│   ├── 3-elements/         # HTML elements
│   ├── 4-objects/          # Layout patterns
│   ├── 5-components/       # Global components
│   ├── 6-landing/          # Section styles
│   └── 7-utilities/        # Helper classes
├── lib/                    # Utilities & Supabase clients
├── supabase/schema.sql     # Database schema
└── DESIGN.md               # Design system docs
```

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint (TS/TSX)
pnpm lint:css     # Stylelint (SCSS)
pnpm lint:all     # Lint everything
pnpm typecheck    # TypeScript check
```

## Branches

- `main` — Production-ready code
- `develop` — Active development

## License

Private — Aethel Software
