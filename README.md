# Aethel Software

> **Precision Engineering Atelier** — Plataforma corporativa + panel de administración.

Aethel Software es una landing page de alto rendimiento para un atelier de ingeniería de software, acompañada de un panel de administración protegido. El proyecto sigue un sistema de diseño propio llamado **Precision Engineering Atelier** (modo oscuro únicamente, acentos cian eléctrico y dorado champán).

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Lenguaje** | TypeScript (modo estricto) |
| **Estilos — Landing** | SCSS ITCSS + BEM (tokens CSS `--ae-*`) |
| **Estilos — Admin** | Tailwind CSS v4 (config CSS-first, sin `tailwind.config.ts`) + shadcn/ui |
| **Componentes UI** | shadcn/ui (estilo new-york, Radix primitives) — solo admin |
| **Base de datos** | Supabase (PostgreSQL + Supabase Auth) |
| **Auth** | Supabase Auth vía `@supabase/ssr` (cookies) |
| **Gestor de paquetes** | pnpm |

---

## Arquitectura

```
/ → Landing page (componentes propios con SCSS, SIN shadcn/ui)
/admin → Panel de administración (shadcn/ui, protegido con Supabase Auth)
components/ui/ → Componentes shadcn/ui (SOLO admin)
components/landing/ → Componentes propios del landing
lib/supabase/ → Clientes Supabase (browser + server)
```

### Aislamiento landing ↔ admin

La landing y el admin **comparten el layout raíz pero no los estilos**:

- La landing vive en un **route group** `app/(landing)/` cuyo layout importa `styles/global.scss` (SCSS ITCSS con el sistema de diseño Aethel).
- El admin NO carga ese SCSS: usa únicamente tokens semánticos de Tailwind/shadcn definidos en `app/globals.css`.
- Esto impide que los estilos globales del landing (reset, headings, forms) contaminen los componentes shadcn del admin.

| Ruta | Layout de estilos | Sistema de diseño |
|------|-------------------|-------------------|
| `/` | `app/(landing)/layout.tsx` → `global.scss` | Aethel (ciano/ora · SCSS BEM) |
| `/admin` | Raíz → `globals.css` | shadcn/ui neutro dark/light |

---

## Sistema de Diseño: Precision Engineering Atelier

Todos los tokens viven en `styles/0-config/_css-variables.scss` y se exponen como variables CSS `--ae-*`:

- **Canvas de fondo:** `--ae-canvas-void: #030712`, `--ae-surface-abyssal: #090D16`
- **Primario — Cian Eléctrico:** `--ae-primary: #c3f5ff`, `--ae-primary-container: #00e5ff`
- **Secundario — Dorado Champán:** `--ae-secondary: #dec571`
- **Tipografía:** Space Grotesk (display/labels), Hanken Grotesk (body)
- **Elevación 4 capas:** glassmorphism, micro-hairlines, glows sutiles
- **Convenciones:** BEM (`block__element--modifier`), ITCSS (capas `0-config` → `7-utilities`), responsive con `@media` basado en breakpoints de `0-config/_scss-variables.scss`

> Las reglas de código (no importar capas superiores, no `!important`, tokens centralizados, responsive con mixins) están documentadas en `CODING_STANDARDS.md`.

---

## Puesta en Marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# 3. Servidor de desarrollo
pnpm dev
```

El proyecto **funciona sin Supabase**: si no se configuran las variables de entorno, el admin muestra datos de ejemplo (mock data) y el formulario de contacto registra la petición en consola.

---

## Scripts

```bash
pnpm dev          # Servidor de desarrollo (Turbopack)
pnpm build        # Build de producción
pnpm start        # Sirve el build de producción
pnpm typecheck    # TypeScript estricto (tsc --noEmit)
pnpm lint         # ESLint (TS/TSX)
pnpm lint:css     # Stylelint (SCSS)
pnpm lint:css:fix # Auto-corrige SCSS
pnpm lint:all     # Lint completo (TS + SCSS)
```

---

## Base de Datos & Seguridad

El esquema vive en `supabase/schema.sql` e incluye:

- **`public.projects`** — Portfolio de proyectos mostrado en la landing.
- **`public.site_content`** — Secciones editables del landing (CMS) como JSONB.
- **`handle_updated_at()`** — Trigger que actualiza `updated_at` automáticamente.
- **Row Level Security (RLS) habilitada** en todas las tablas:
  - Lectura pública (`select`) para el landing.
  - Acceso `authenticated` para el CRUD del admin.

> Regla de oro: ningún secreto en cliente. El key `service_role` jamás se expone; la autenticación se verifica con `supabase.auth.getUser()` (no `getSession()`).

---

## Estructura de Carpetas

```
├── app/
│   ├── (landing)/             # Route group de la landing (su propio layout con SCSS)
│   │   ├── layout.tsx         # Importa styles/global.scss
│   │   └── page.tsx           # Composicion de las 9 secciones
│   ├── admin/                 # Panel de administración (shadcn/ui)
│   │   ├── actions/           # Server Actions (projects, content, auth)
│   │   └── page.tsx           # Dashboard
│   ├── actions/               # Server Actions globales (contact form)
│   └── globals.css            # Tokens Tailwind/shadcn (@theme inline)
├── components/
│   ├── landing/               # Componentes del landing (SCSS propio)
│   ├── admin/                 # Componentes admin (forms, dialogs, client wrappers)
│   └── ui/                    # shadcn/ui (solo admin)
├── lib/
│   ├── supabase/              # Clientes browser + server
│   └── types.ts               # Interfaces compartidas (Project, SiteContent)
├── styles/                    # SCSS ITCSS del landing
│   ├── 0-config/              # Tokens (colores, tipografía, espaciado)
│   ├── 2-generic/             # Reset, scrollbar
│   ├── 3-elements/            # h1-h6, a, forms
│   ├── 4-objects/             # Container, grid, wrapper
│   ├── 5-components/          # Navbar, footer, blueprint-divider
│   ├── 6-landing/             # Estilos por sección (hero, services, design-seo…)
│   └── 7-utilities/           # Helpers
├── supabase/schema.sql        # DDL + RLS + seeds
├── middleware.ts              # Refresh de tokens + guard de /admin
└── .env.example               # Plantilla de variables de entorno
```

---

## Secciones del Landing

Las 9 secciones se componen en `app/(landing)/page.tsx`:

1. **Hero** — Propuesta de valor + consola de telemetría animada
2. **Social Proof** — SLA, certificaciones y métricas de confianza
3. **Services** — 4 servicios de ingeniería (`#arquitecturas`)
4. **Design & SEO** — Diseño UX/UI + SEO técnico (`#diseño-crecimiento`)
5. **Tech Stack** — Herramientas y runtimes (`#stack`)
6. **Process** — Metodología en 4 fases (`#metodologia`)
7. **Case Studies** — Casos de éxito (`#casos`)
8. **Philosophy** — Manifiesto y pilares
9. **Contact** — Canales + formulario con evaluación técnica (`#contacto-evaluacion`)

---

## Flujo de Trabajo Git

- `develop` — Rama principal de desarrollo.
- `feat/*` — Feature branches creadas desde `develop`.
- `main` — Producción (aún no activa).

Todo cambio se integra vía **Pull Request** a `develop`. Después de un merge con conflicto o rebase, se requiere `git push --force-with-lease`.

---

## Documentación Relacionada

| Documento | Contenido |
|-----------|-----------|
| `AGENTS.md` | Convenciones del proyecto para agentes de IA y desarrolladores |
| `CODING_STANDARDS.md` | Reglas de código SCSS, BEM/ITCSS y structure forzadas por linters |
| `supabase/schema.sql` | Esquema de base de datos, RLS y seeds |

---

## Licencia

Privado — Aethel Software AG.