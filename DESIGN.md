# Aethel Software — Precision Engineering Atelier
## Design System & Technical Specifications

> **Versión:** 1.0.0  
> **Tema:** Dark Mode Exclusivo (OLED Black / Canvas Void)  
> **Estética:** *Precision Engineering Atelier* — Minimalismo técnico, tipografía suiza arquitectónica, micro-hairlines y acentos de ingeniería aeroespacial.

---

## 1. Filosofía de Diseño

El sistema de diseño **Precision Engineering Atelier** proyecta el rigor, la exactitud matemática y la alta confiabilidad de un estudio de ingeniería de software de élite.

* **Cero sombras difusas tradicionales:** En lugar de sombras (`box-shadow`), la profundidad visual se genera mediante **contraste de sustratos**, **micro-hairlines** (`1px solid rgba(255, 255, 255, 0.08)`), **glassmorphism** (`backdrop-blur`) y **resplandores de fotones** (*glows* cibernéticos contenidos).
* **Tipografía como estructura:** Jerarquía estricta con titulares geométricos en *Space Grotesk* y cuerpo de texto de legibilidad óptima en *Hanken Grotesk*.
* **Paleta Bicolor de Alta Frecuencia:** Fondo oscuro abisal acentuado por **Electric Cyan** (`#00E5FF` — tecnología, lógica, computación cuántica) y **Champagne Gold** (`#E2C974` — artesanía digital, rigor suizo, acabados premium).

---

## 2. Paleta de Colores y Tokens Semánticos

Todos los colores están registrados en `app/globals.css` (`@theme inline`) y en `styles/0-config/_colors.scss` como variables CSS nativas (`--ae-*` y `--color-aethel-*`).

### Sustratos & Fondos (Canvases)
| Nombre del Token | Valor Hex | Uso / Propósito |
|---|---|---|
| `--ae-canvas-void` | `#030712` | Fondo absoluto de la aplicación (Canvas principal) |
| `--ae-surface-abyssal` | `#090D16` | Fondo secundario para secciones alternadas |
| `--ae-surface` | `#0E131F` | Superficie estándar para tarjetas y módulos de contenido |
| `--ae-surface-architectural` | `#111827` | Paneles elevados y barras de navegación |
| `--ae-surface-bright` | `#343946` | Estados hover y resaltados de superficie |
| `--ae-surface-variant` | `#2F3542` | Contenedores anidados de baja jerarquía |

### Acentos de Marca (Brand Accents)
| Nombre del Token | Valor Hex | Uso / Propósito |
|---|---|---|
| `--ae-primary-container` | `#00E5FF` | **Electric Cyan:** Botones primarios, indicadores activos, telemetría |
| `--ae-primary` | `#C3F5FF` | Cyan claro para textos interactivos sobre fondo oscuro |
| `--ae-on-primary` | `#00363D` | Texto sobre botón primario |
| `--ae-secondary` | `#DEC571` | **Champagne Gold:** Badges de misión crítica, tags destacados |
| `--ae-secondary-container` | `#5D4C00` | Fondo para chips y elementos dorados |
| `--ae-on-secondary-container` | `#D6BE6A` | Texto de acento dorado suave |

### Tipografía & Legibilidad (Text)
| Nombre del Token | Valor Hex | Uso / Propósito |
|---|---|---|
| `--ae-text-ice` | `#F8FAFC` | Titulares principales, métricas y datos clave |
| `--ae-on-surface` | `#DDE2F3` | Texto de cuerpo principal |
| `--ae-text-muted` | `#94A3B8` | Subtítulos, descripciones secundarias y metadatos |
| `--ae-outline` | `#849396` | Etiquetas de formulario y divisores sutiles |

### Bordes y Hairlines (Borders)
| Nombre del Token | Valor / RGBA | Uso / Propósito |
|---|---|---|
| `--ae-border-subtle` | `rgba(255, 255, 255, 0.08)` | Micro-hairline estándar para todas las tarjetas |
| `--ae-border-active` | `rgba(0, 229, 255, 0.45)` | Borde de hover/foco en elementos interactivos Cyan |
| `--ae-border-gold` | `rgba(226, 201, 116, 0.40)` | Borde de hover/foco en elementos interactivos Gold |

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
* **Estilo:** Neo-grotesca suiza, apertura amplia para máxima legibilidad sobre fondo oscuro.
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
│ (bg: #111827 / border: active / backdrop-blur: 16px)      │
├───────────────────────────────────────────────────────────┤
│ Nivel 2: Barras de Navegación & Overlays Flotantes        │
│ (bg: rgba(3, 7, 18, 0.8) / border: subtle / blur: 12px)   │
├───────────────────────────────────────────────────────────┤
│ Nivel 1: Tarjetas de Casos de Éxito & Servicios           │
│ (bg: #0E131F / border: 1px solid rgba(255,255,255,0.08)) │
├───────────────────────────────────────────────────────────┤
│ Nivel 0: Fondo Absoluto (Canvas Void #030712)             │
└───────────────────────────────────────────────────────────┘
```

---

## 5. Efectos de Luz & Glassmorphism

### Resplandor de Fotones (Photon Glows)
* **Cyan Glow:** `box-shadow: 0 0 25px rgba(0, 229, 255, 0.15);` (Utilizado en botones primarios y acentos activos).
* **Gold Glow:** `box-shadow: 0 0 25px rgba(226, 201, 116, 0.15);` (Utilizado en métricas de alto impacto).

### Acabado de Vidrio Técnico (Glass Panel)
```css
.glass {
  background: rgba(14, 19, 31, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 6. Reglas de Implementación de Componentes

### Landing Page (`/` y `components/landing/`)
* **Prohibido:** No utilizar componentes de `components/ui/` (shadcn) en la landing page.
* **Permitido:** Estilos CSS/SCSS puros con la arquitectura BEM existente (`styles/6-landing/`) y tokens CSS de `app/globals.css`.
* **Imágenes:** Usar siempre `<Image />` de `next/image` con tamaños adaptativos (`sizes="..."`) y `priority` únicamente en elementos de impacto LCP (como el Hero o primer caso de estudio).

### Panel de Control (`/admin` y `components/admin/`)
* **Permitido:** Uso de componentes shadcn/ui (`components/ui/`) adaptados al tema oscuro.
* **Consistencia:** Mantener la estética sobria y profesional de consola de operaciones bancaria/aeroespacial.
