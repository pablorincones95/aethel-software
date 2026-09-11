# Aethel Software — Coding Standards

> Reglas de desarrollo que todo agente de IA y desarrollador humano deben seguir.
> Estas reglas son **forzadas automáticamente** por Stylelint y ESLint.

---

## Reglas Fundamentales

### 1. No código espagueti
- **Cada componente** tiene su propio archivo `.module.scss`
- **Un archivo SCSS = un componente** o una sección
- **Máximo 300 líneas** por archivo SCSS. Si es más largo, dividir.

### 2. No duplicación de código
- Extraer patrones repetidos a `1-tools/_mixins.scss`
- Extraer valores repetidos a `0-config/_*.scss`
- **Regla:** Si copias un bloque >3 veces, cré un mixin

### 3. No CSS inline
- **NUNCA** usar `style={{ }}` en JSX para landing
- **NUNCA** usar `style={{ }}` en componentes admin a menos que sea dinámico (JS calculado)
- Usar **SCSS modules** para landing
- Usar **Tailwind utilities** para admin

### 4. Naming BEM
```scss
// ✅ Correcto
.hero__title--featured { }
.card__image { }
.navbar__link { }

// ❌ Incorrecto
.heroTitle { }
.cardImage { }
.nav_link { }
```

### 5. ITCSS Order
Siempre importar en orden dentro de `global.scss`:
1. Config → 2. Tools → 3. Generic → 4. Elements → 5. Objects → 6. Components → 7. Landing → 8. Utilities

Nunca importar un archivo de capa superior desde inferior.

### 6. Tokens centralizados
```scss
// ❌ Incorrecto - hardcodear valores
color: #00E5ff;
padding: 16px;
border-radius: 0.5rem;

// ✅ Correcto - usar tokens
color: $color-primary-container;
padding: $space-base;
border-radius: $radius-lg;
```

### 7. No !important
- Usar especificidad correctamente
- Si necesitas `!important`, reestructura el CSS
- Excepción: utility classes en `7-utilities/`

### 8. Componentes aislados
- Cada componente landing tiene su `.module.scss`
- No compartir estilos entre componentes sin mixin
- Importar solo lo necesario

### 9. Responsive con mixins
```scss
// ❌ Incorrecto - media query inline
@media (min-width: 768px) {
  font-size: 32px;
}

// ✅ Correcto - usar mixin
@include respond-to(md) {
  font-size: 32px;
}
```

### 10. Archivos organizados
| Tipo | Naming | Ejemplo |
|------|--------|---------|
| SCSS files | kebab-case | `_blueprint-divider.scss` |
| Component files | PascalCase | `Hero.tsx` |
| CSS Module classes | BEM | `hero__title--featured` |
| Config SCSS files | _kebab-case | `_colors.scss` |

---

## Estructura de Carpetas

```
styles/
├── 0-config/          ← Tokens (colores, tipografía, espaciado)
├── 1-tools/           ← Mixins & functions (sin output CSS)
├── 2-generic/         ← Reset, scrollbar
├── 3-elements/        ← h1-h6, a, form elements
├── 4-objects/         ← Container, grid, wrapper
├── 5-components/      ← Navbar, footer, blueprint-divider
├── 6-landing/         ← Estilos de secciones landing
└── 7-utilities/       ← Text, visibility helpers
```

---

## Para Agentes de IA

Al generar código SCSS:
1. **Siempre** usar tokens de `0-config/` — nunca hardcodear valores
2. **Siempre** usar mixins de `1-tools/` — nunca repetir patrones
3. **Siempre** seguir BEM naming
4. **Siempre** usar `@include respond-to()` para responsive
5. **NUNCA** crear archivos fuera de la estructura ITCSS
6. **NUNCA** usar `!important`
7. **NUNCA** anidar más de 4 niveles
8. **NUNCA** usar selectores con más de 2 niveles de especificidad

---

## Verificación Automática

```bash
# Lint SCSS
pnpm lint:css

# Fix SCSS automáticamente
pnpm lint:css:fix

# Lint todo
pnpm lint:all
```

Si el lint falla, el código NO se puede commitear.
