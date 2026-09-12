## ¿Qué hace este PR?

<!-- Describe brevemente los cambios. Una línea es suficiente. -->

## Tipo de cambio

- [ ] 🐛 Bug fix
- [ ] ✨ Nueva feature
- [ ] 🎨 Cambio de UI / diseño
- [ ] ♻️ Refactor (sin cambio de comportamiento)
- [ ] 🔒 Seguridad
- [ ] 📝 Documentación
- [ ] 🗄️ Base de datos / Schema

## Checklist

### Código
- [ ] No hay `console.log` ni código de debug
- [ ] Server Components por defecto; `"use client"` solo cuando es necesario
- [ ] Named exports en todos los componentes
- [ ] `cn()` usado para clases condicionales

### Diseño (si aplica)
- [ ] Usa tokens CSS (`var(--ae-*)`) — nunca colores Tailwind hardcodeados
- [ ] Compatible dark-mode (el único modo soportado)
- [ ] Fuentes correctas: Space Grotesk (display) / Hanken Grotesk (body)
- [ ] shadcn/ui solo en `/admin`, componentes custom en `/components/landing`

### Seguridad
- [ ] Sin `service_role` key en client code
- [ ] Sin secrets hardcodeados
- [ ] Server Actions usan `supabase.auth.getUser()` para verificar auth
- [ ] Rutas admin protegidas por middleware

### Base de datos (si aplica)
- [ ] Cambios en `supabase/schema.sql`
- [ ] RLS policies actualizadas

## Screenshots (si hay cambios de UI)

<!-- Adjunta screenshots o grabaciones antes/después -->

## Issue relacionado

<!-- Closes #XXX -->
