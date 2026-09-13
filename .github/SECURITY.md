# Security Policy — Aethel Software

## Versiones soportadas

| Versión | Soportada |
|---------|-----------|
| `main`  | ✅ Activa |
| Otras   | ❌ No soportadas |

## Reportar una vulnerabilidad

**No abras un issue público** si encontraste una vulnerabilidad de seguridad.

Envía un reporte privado a través de:
- GitHub Security Advisories (pestaña **Security → Report a vulnerability**)
- O directamente al maintainer

### Qué incluir en el reporte
1. Descripción de la vulnerabilidad
2. Pasos para reproducirla
3. Impacto potencial
4. Sugerencia de fix (opcional)

### Tiempo de respuesta
- Acuse de recibo: **48 horas**
- Evaluación inicial: **7 días**
- Patch / mitigación: dependiendo de la severidad

## Lecciones aprendidas

Este repositorio sufrió un **supply-chain attack** (commit `1fd3e68`, 11 Sep 2026) donde `postcss.config.mjs` fue reemplazado con JavaScript ofuscado (payload `9-0006-13`). Fue detectado y eliminado en el commit `e841a6b`.

### Medidas implementadas tras el incidente
- ✅ CI con scan automático de patrones obfuscados en cada PR
- ✅ CODEOWNERS requiere revisión obligatoria en archivos de configuración
- ✅ Dependency Review en cada PR a `main`
- ✅ `pnpm-lock.yaml` committeado para lockear versiones exactas
