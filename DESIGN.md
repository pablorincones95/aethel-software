# Aethel Software — Precision Engineering Atelier
## Design System & Technical Specifications

> **Versión:** 1.1.0  
> **Temas:** Dual Theme — Dark Mode (*OLED Black / Canvas Void*) & Light Mode (*Architectural Minimalist Pure / AAA Contrast*)  
> **Estética:** *Precision Engineering Atelier* — Minimalismo técnico, tipografía suiza arquitectónica, micro-hairlines y acentos de ingeniería aeroespacial.

---

## 1. Filosofía de Diseño

El sistema de diseño **Precision Engineering Atelier** proyecta el rigor, la exactitud matemática y la alta confiabilidad de un estudio de ingeniería de software de élite.

* **Cero sombras difusas tradicionales:** En lugar de sombras pesadas (`box-shadow`), la profundidad visual se genera mediante **contraste de sustratos**, **micro-hairlines** de 1px, **glassmorphism** (`backdrop-blur`) y **resplandores de fotones** (*glows* cibernéticos contenidos).
* **Tipografía como estructura:** Jerarquía estricta con titulares geométricos en *Space Grotesk* y cuerpo de texto de legibilidad óptima en *Hanken Grotesk*.
* **Paleta Bicolor de Alta Frecuencia:** Acentuada por **Electric Cyan** (tecnología, lógica, computación cuántica) y **Champagne Gold** (artesanía digital, rigor suizo, acabados premium).
* **Arquitectura Dual Theme:** Soporte transparente de Modo Oscuro y Modo Claro gobernado por `next-themes` (`.dark` y `.light`), manteniendo idéntica estructura semántica y legibilidad AAA en ambos entornos.

---

## 2. Paleta de Colores & Tokens Semánticos

Todos los tokens están registrados en `styles/0-config/_css-variables.scss` como variables CSS nativas (`--ae-*`) y mapeados en `app/globals.css` (`@theme inline`) para utilities de Tailwind.

### 🌙 Modo Oscuro (*Precision Engineering Atelier Dark*)
| Nombre del Token | Valor Hex / RGBA | Uso / Propósito |
|---|---|---|
| `--ae-canvas-void` | `#030712` | Fondo absoluto de la aplicación (Canvas principal) |
| `--ae-surface-abyssal` | `#090D16` | Fondo secundario para secciones alternadas |
| `--ae-surface` | `#0E131F` | Superficie estándar para tarjetas y módulos de contenido |
| `--ae-surface-architectural` | `#111827` | Paneles elevados y barras de navegación |
| `--ae-surface-bright` | `#343946` | Estados hover y resaltados de superficie |
| `--ae-surface-variant` | `#2F3542` | Contenedores anidados de baja jerarquía |
| `--ae-surface-container-lowest` | `#080E1A` | Nivel de sustrato más profundo |
| `--ae-surface-container-low` | `#161C28` | Fondo de tarjetas nivel 1 |
| `--ae-surface-container` | `#1A202C` | Fondo de bloques técnicos y grids |
| `--ae-surface-container-high` | `#242A36` | Contenedores elevados y hover states |
| `--ae-surface-container-highest`| `#2F3542` | Elementos de máxima interacción |
| `--ae-primary-container` | `#00E5FF` | **Electric Cyan:** Botones primarios, indicadores activos, telemetría |
| `--ae-primary` | `#C3F5FF` | Cyan claro para textos interactivos sobre fondo oscuro |
| `--ae-on-primary` | `#00363D` | Texto de alto contraste sobre botón primario |
| `--ae-secondary` | `#DEC571` | **Champagne Gold:** Badges de misión crítica, tags destacados |
| `--ae-secondary-container` | `#5D4C00` | Fondo para chips y elementos dorados |
| `--ae-on-secondary-container` | `#D6BE6A` | Texto de acento dorado suave |
| `--ae-text-ice` | `#F8FAFC` | Titulares principales, métricas y datos clave |
| `--ae-on-surface` | `#DDE2F3` | Texto de cuerpo principal |
| `--ae-text-muted` | `#94A3B8` | Subtítulos, descripciones secundarias y metadatos |
| `--ae-outline` | `#849396` | Etiquetas de formulario y divisores sutiles |
| `--ae-outline-variant` | `#3B494C` | Bordes acentuados de estructura |
| `--ae-border-subtle` | `rgba(255, 255, 255, 0.08)` | Micro-hairline estándar para todas las tarjetas |
| `--ae-border-active` | `rgba(0, 229, 255, 0.45)` | Borde de hover/foco en elementos interactivos Cyan |
| `--ae-border-gold` | `rgba(226, 201, 116, 0.40)` | Borde de hover/foco en elementos interactivos Gold |
| `--ae-navbar-bg` | `rgba(17, 24, 39, 0.70)` | Fondo translúcido de la barra de navegación |

---

### ☀️ Modo Claro (*Precision Engineering Atelier Light*)
| Nombre del Token | Valor Hex / RGBA | Uso / Propósito |
|---|---|---|
| `--ae-canvas-void` | `#FAFAFF` | Fondo blanco hielo minimalista ultra limpio |
| `--ae-surface-abyssal` | `#F1F5F9` | Pizarra tenue para alternar bandas de sección |
| `--ae-surface` / `bright` | `#FAFAFF` / `#FFFFFF` | Contenedores primarios y tarjetas elevadas |
| `--ae-surface-architectural` | `#FFFFFF` | Paneles arquitectónicos y menús flotantes |
| `--ae-surface-container-lowest` | `#FFFFFF` | Sustrato blanco inmaculado |
| `--ae-surface-container-low` | `#F8FAFC` | Paneles de fondo sutiles |
| `--ae-surface-container` | `#F1F5F9` | Tableros y tarjetas secundarias |
| `--ae-surface-container-high` | `#E2E8F0` | Elementos de interfaz activos, badges y estados hover |
| `--ae-surface-container-highest`| `#CBD5E1` | Fondos de input y selectores |
| `--ae-primary-container` | `#0891B2` | **Cian Eléctrico Calibrado (AAA):** Botones CTAs y enlaces activos |
| `--ae-primary` | `#0891B2` | Cian de alta legibilidad para elementos interactivos |
| `--ae-on-primary` | `#FFFFFF` | Texto blanco puro sobre botón primario |
| `--ae-secondary` | `#B45309` | **Oro Champagne Calibrado (AAA):** Métricas de distinción y badges |
| `--ae-secondary-container` | `#FEF3C7` | Contenedores sutiles de oro claro |
| `--ae-on-secondary-container` | `#78350F` | Texto sobre acento dorado |
| `--ae-text-ice` | `#0F172A` | Azul medianoche profundo (H1–H3, títulos, máxima legibilidad) |
| `--ae-on-surface` | `#0F172A` | Titulares y cuerpo principal |
| `--ae-on-surface-variant` | `#475569` | Pizarra arquitectónico para descripciones y párrafos |
| `--ae-text-muted` | `#64748B` | Pizarra técnico para metadatos, labels y sobre-líneas |
| `--ae-outline` | `#E2E8F0` | Micro-hairlines de 1px en pizarra suave |
| `--ae-outline-variant` | `#CBD5E1` | Bordes acentuados de estructura |
| `--ae-border-subtle` | `rgba(15, 23, 42, 0.08)` | Micro-hairline técnico sobre fondo blanco |
| `--ae-border-active` | `rgba(8, 145, 178, 0.45)` | Resaltes de foco y selección en cian |
| `--ae-border-gold` | `rgba(180, 83, 9, 0.35)` | Separadores y acentos dorados calibrados |
| `--ae-navbar-bg` | `rgba(255, 255, 255, 0.85)` | Fondo translúcido glassmorphic claro |

---

## 3. Tipografía

El sistema tipográfico se basa en dos familias cargadas mediante `next/font/google` con optimización de layout shift (CLS):

### 1. Titulares & Etiquetas Técnicas: Space Grotesk
* **Variables:** `--font-display`, `font-display`
* **Estilo:** Geométrica, corte mecánico, números tabulares.
* **Usos:**
  * H1, H2, H3, H4.
  * Etiquetas técnicas en mayúsculas (`text-label-caps`): `font-mono tracking-[0.2em] text-xs uppercase`.
  * Métricas y contadores (`tabular-nums`).

### 2. Cuerpo de Texto: Hanken Grotesk
* **Variables:** `--font-body`, `font-sans`
* **Estilo:** Neo-grotesca suiza, apertura amplia para máxima legibilidad.
* **Usos:**
  * Párrafos de lectura, artículos de blog, listas descriptivas.
  * Formularios y campos de entrada.

### Escala Tipográfica de Referencia
```scss
$text-display-2xl: clamp(2.5rem, 5vw + 1rem, 4.5rem); // Titular Hero
$text-display-xl:  clamp(2rem, 4vw + 0.5rem, 3.25rem); // H2 de Sección
$text-title-lg:    1.5rem;                             // Título de Tarjeta
$text-body-base:   1rem;                               // Párrafo estándar (16px)
$text-body-sm:     0.875rem;                           // Metadatos (14px)
$text-caption:     0.75rem;                            // Overlines y Badges (12px)
```

---

## 4. Sistema de Elevación (4 Niveles Sin Sombras)

En lugar de sombras difusas comunes de UI tradicional, la jerarquía espacial se define mediante **niveles de sustrato y micro-bordes**:

```
┌───────────────────────────────────────────────────────────┐
│ Nivel 3: Modales, Drawers & Popovers                      │
│ (bg: var(--ae-surface-architectural) / border: active)    │
├───────────────────────────────────────────────────────────┤
│ Nivel 2: Barras de Navegación & Overlays Flotantes        │
│ (bg: var(--ae-navbar-bg) / border: subtle / blur: 16px)   │
├───────────────────────────────────────────────────────────┤
│ Nivel 1: Tarjetas de Casos de Éxito & Servicios           │
│ (bg: var(--ae-card-bg) / border: 1px subtle)              │
├───────────────────────────────────────────────────────────┤
│ Nivel 0: Fondo Absoluto (Canvas Void var(--ae-canvas-void))
└───────────────────────────────────────────────────────────┘
```

---

## 5. Efectos de Luz & Glassmorphism

### Resplandor de Fotones (Photon Glows)
* **Cyan Glow:** `box-shadow: 0 0 24px var(--ae-border-active);` (Utilizado en botones primarios y acentos activos).
* **Gold Glow:** `box-shadow: 0 0 24px var(--ae-border-gold);` (Utilizado en métricas de alto impacto).

### Acabado de Vidrio Técnico (Glass Panel)
```css
.glass {
  background: var(--ae-navbar-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--ae-border-subtle);
}
```

---

## 6. Reglas de Implementación de Componentes

### Landing Page (`/` y `components/landing/`)
* **Prohibido:** No utilizar componentes de `components/ui/` (shadcn) en la landing page.
* **Permitido:** Estilos CSS/SCSS puros con la arquitectura BEM existente (`styles/6-landing/`) y tokens CSS de `styles/0-config/_css-variables.scss`.
* **Theme Switching:** Utilizar `components/landing/theme-toggle.tsx` integrado en `navbar.tsx`.
* **Imágenes:** Usar siempre `<Image />` de `next/image` con tamaños adaptativos (`sizes="..."`) y `priority` únicamente en elementos de impacto LCP.

### Panel de Control (`/admin` y `components/admin/`)
* **Permitido:** Uso de componentes shadcn/ui (`components/ui/`) adaptados al tema oscuro.
* **Consistencia:** Mantener la estética sobria y profesional de consola de operaciones bancaria/aeroespacial.
