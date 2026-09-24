# Análisis de Estado del Proyecto — Portfolio Kastidev (client)

> **Rama:** `estado-proyecto` · **Fecha:** 2026-09-24 · **Stack:** Next.js 16.2.9 + React 19.2.7 + Tailwind CSS v4 + Redux Toolkit + Framer Motion + FontAwesome + Zod + Axios  
> **Backend externo:** `NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/v1/` · **Tests:** Vitest + Testing Library + jsdom · **Hooks:** Husky pre-commit (`npm test`)

---

## Resumen ejecutivo

Portfolio personal de Paulo Castillo. Arquitectura de componentes bien organizada, SEO básico correcto (robots, sitemap, metadata), animaciones ricas y admin con CRUD funcional. Deuda principal: código muerto/duplicado, mock data hardcodeado en admin, tests con import paths rotos, servicios re-instanciados en cada render, e inconsistencias de estilos.

| Categoría | Hallazgos |
|---|---|
| Críticos (código muerto / duplicados) | 5 |
| Seguridad | 2 |
| Código muerto / no funcional | 9 |
| Performance | 2 |
| Estilos / consistencia | 4 |
| Tests | 3 |
| Arquitectura | 3 |
| **Total** | **28** |

---

## 1. Críticos

### 1.1 `iron-session` nunca se usa
- **Ubicación:** `package.json:dependencies` (`iron-session@^8.0.4`)
- **Evidencia:** ningún `import`/`require` en `app/`, `services/`, `store/`, `utils/`.
- **Riesgo:** dependencia fantasma, aumenta bundle y superficie de auditoría.
- **Acción sugerida:** `npm uninstall iron-session`.

### 1.2 `jest.config.ts` es archivo muerto
- **Ubicación:** `jest.config.ts` (201 líneas)
- **Evidencia:** scripts usan `vitest` (`npm test` → `vitest`), config real en `vitest.config.ts`.
- **Acción sugerida:** eliminar `jest.config.ts`.

### 1.3 `proxy.ts` no es middleware
- **Ubicación:** `proxy.ts` en raíz del proyecto
- **Evidencia:** exporta `proxy()` y `config` pero Next.js solo ejecuta `middleware.ts` en raíz. No se ejecuta nunca.
- **Acción sugerida:** renombrar a `middleware.ts` si es intencional, o eliminar si no.

### 1.4 `ValuesSection` duplicado
- **Ubicación:** `app/shared/ui/ValuesSection.tsx` vs `app/components/sections/ValuesSection.tsx`
- **Evidencia:** dos implementaciones distintas (SVG custom vs FontAwesome). `app/page.tsx` importa solo el de `components/sections/`. El de `shared/ui/` no tiene imports.
- **Acción sugerida:** eliminar el no usado y dejar una sola fuente.

### 1.5 `BaseCard` duplicado (mismo nombre, distinta interfaz)
- **Ubicación:** `app/shared/ui/BaseCard.tsx` (datos hardcodeados de 3 proyectos, sin uso) vs `app/admin/shared/ui/BaseCard.tsx` (card de métricas)
- **Acción sugerida:** renombrar al menos uno (`ProjectCard` / `MetricCard`) o eliminar el no usado.

---

## 2. Seguridad

### 2.1 API GET sin autenticación
- **Ubicación:** `app/api/admin/projects/[id]/route.ts`, `app/api/admin/posts/[id]/route.ts`
- **Evidencia:** `GET` no verifica cabeceras de auth, puede filtrar borradores no publicados.
- **Acción sugerida:** exigir `getAuthorizationHeaders()` también en `GET`.

### 2.2 `validateToken()` usa variable pública
- **Ubicación:** `utils/utils.ts:validateToken()`
- **Evidencia:** lee `process.env.NEXT_PUBLIC_BASE_URL` (expuesta al bundle client). En proxy/middleware corre server-side pero la variable queda en el cliente sin necesidad.
- **Acción sugerida:** usar variable privada (`BASE_URL` sin prefijo `NEXT_PUBLIC_`) para validación server-side.

---

## 3. Código muerto / no funcional

| # | Componente / archivo | Problema |
|---|---|---|
| 3.1 | `app/components/AppFooter.tsx` | Año hardcodeado `"2025"` → usar `new Date().getFullYear()`. |
| 3.2 | `app/hooks/useAuth.ts` | `logout` comentado, pero `authService.logout()` existe. |
| 3.3 | `app/admin/projects/components/body/Filters.tsx` | Botones (ALL SYSTEMS, WEB APPS…) puramente visuales, sin filtrado. |
| 3.4 | `app/admin/projects/components/body/Status.tsx` | `3 LIVE / 1 DEV / 1 ARCHIVED` hardcodeado. |
| 3.5 | `app/admin/projects/components/header/Searchbar.tsx` | Input sin `onChange`/handler. |
| 3.6 | `app/admin/projects/[slug]/components/SocialShare.tsx` | Iconos sin `onClick`. |
| 3.7 | `app/admin/analytics/page.tsx` + `components/AnalyticsCard.tsx` | 100% mock (1,204 live users, `80*40+60`). |
| 3.8 | `app/config/siteConfig.ts` | Instagram/TikTok → `@yourprofile` placeholder. |
| 3.9 | `app/admin/shared/ui/Search.tsx` | Usa `material-symbols-outlined` sin importar Material Icons. |

---

## 4. Performance

### 4.1 Servicios re-creados en cada render
- **Ubicación:** `app/hooks/usePosts.ts`, `app/hooks/useProjects.ts`, `app/components/sections/BlogSection.tsx`, `app/blog/page.tsx`, etc. (`const service = postService()` dentro del componente)
- **Acción sugerida:** singleton fuera del componente o `useMemo`.

### 4.2 `useEffect` con dependencias incompletas
- **Ubicación:** `app/hooks/useAuth.ts` (`[dispatch]` pero usa `authService()` recreado)
- **Acción sugerida:** memoizar servicio o incluirlo en deps correctamente.

> Nota: `next.config.ts:experimental.optimizePackageImports` solo optimiza FontAwesome; `framer-motion` importado en muchos client components podría beneficiarse de la misma optimización.

---

## 5. Estilos / consistencia

### 5.1 `dashboard.css` con error CSS — **corregido por el usuario en esta rama**
- Antes: `--color-cyan: "#06B6D4"` (comillas rompen el valor). Estado actual verificado: `--color-cyan: #06B6D4` sin comillas → OK. No se toca en este commit por indicación del usuario.
- Quedan rarezas no bloqueantes en el archivo (`--box-shadow-glow-neon` con gradient como shadow y `--color-neon-cyan:var(--color-neon, --color-cyan)` con fallback inválido) — fuera de alcance por ahora.

### 5.2 Admin usa colores hardcodeados en vez de variables del theme
- **Ubicación:** `app/admin/analytics/page.tsx`, `app/admin/analytics/components/AnalyticsCard.tsx`, `app/admin/shared/ui/Progressbar.tsx`
- **Valores:** `bg-[#020815]`, `bg-[#0A1128]/60`, `bg-[#050D20]`, `bg-[#020815]/50`
- **Fix aplicado en esta rama:**
  - `app/globals.css:11-14` → nuevas variables `:root { --admin-void, --admin-surface, --admin-surface-2 }` y `@theme inline { --color-admin-void, --color-admin-surface, --color-admin-surface-2 }`.
  - `AnalyticsCard.tsx:18` → `bg-admin-surface/60`
  - `analytics/page.tsx:21,24,67,68,120` → `bg-admin-void`, `via-admin-void`, `to-admin-void`, `bg-admin-void/50`, `bg-admin-surface-2`
  - `Progressbar.tsx:8` → `bg-admin-void`

### 5.3 `font-display` / `font-body` indefinidos en parte del código
- **Ubicación:** ~24 ocurrencias de `font-display` en `app/admin/**`, `app/blog/**`, `app/components/sections/BlogSection.tsx` + `font-body` en `metadata.tsx`, `ProjectCard.tsx`
- **Evidencia:** `app/globals.css` solo definía `--font-body` y `--font-mono`; `font-display` no existía → sin efecto.
- **Fix aplicado en esta rama:** `app/globals.css:15,34-35` → `:root { --font-display }` + `@theme inline { --font-display: var(--font-display) }` (alias a Inter). Ahora `font-display` es un utility válido y apunta a la misma familia que `font-body` hasta que se decida una tipografía distinta para display.

### 5.4 `Heroe.tsx` con colores hardcodeados pudiendo usar variables del theme
- **Ubicación:** `app/shared/ui/Heroe.tsx:67-69`
- **Antes:** `bg-[#ef4444]`, `bg-[#f59e0b]`, `bg-[#22c55e]`
- **Fix aplicado:** `bg-error`, `bg-warning`, `bg-success` (mapean a `var(--error)`, `var(--warning)`, `var(--success)` ya definidos en `globals.css`).

### 5.5 Mezcla de idiomas (no corregido — pendiente decisión de producto)
- UI en inglés (`PROJECTS`, `LIVE`) + contenido en español (`Sobre mí`, `Proyectos destacados`) + mensajes de error en español. Requiere definir locale y estrategia i18n.

---

## 6. Tests

### 6.1 Imports con rutas inexistentes
- **Evidencia:** tests importan `@/app/admin/shared/components/ui/HeaderContent` pero el archivo real es `@/app/admin/shared/components/HeaderContent` (sin `/ui/`). Múltiples archivos afectados.
- **Impacto:** la mayoría de los 18 test suites fallarían en CI aunque `pre-commit` ejecute `npm test`.

### 6.2 `ProjectCard.test.tsx` usa tipos incorrectos
- Mock: `{ imageUrl, title, description, stack }` vs componente real: `{ id, image_file, title, description, github_link, project_link, tech_stack, published }`.

### 6.3 `HeaderContent.test.tsx` espera props inexistentes
- Test pasa `title`/`subtitle`, componente solo acepta `children`.

---

## 7. Arquitectura

### 7.1 Path alias inconsistente
- `tsconfig.json: @/* → ./app/*` vs `vitest.config.ts: @ → ./`. Un mismo import resuelve distinto en build y en tests.

### 7.2 `postService()` no es singleton ni tiene interceptores de auth
- Cada llamada crea nuevo scope con `axios` por defecto. Requests admin no adjuntan token automáticamente.

### 7.3 Sin React Error Boundary global
- Solo `ErrorModal` vía Redux. Errores de render no se capturan de forma resiliente.

---

## 8. Qué se corrigió en esta rama (`estado-proyecto`)

| Archivo | Cambio | Motivo |
|---|---|---|
| `app/globals.css` | Alias `--font-display` + variables `--admin-void/surface/surface-2` y sus `--color-*` en `@theme inline` | 5.2 y 5.3 |
| `app/shared/ui/Heroe.tsx` | `bg-[#ef4444]/[#f59e0b]/[#22c55e]` → `bg-error/warning/success` | 5.4 |
| `app/admin/analytics/components/AnalyticsCard.tsx` | `bg-[#0A1128]/60` → `bg-admin-surface/60` | 5.2 |
| `app/admin/analytics/page.tsx` | `bg-[#020815]`, `via-[#020815]`, `bg-[#020815]/50`, `bg-[#050D20]` → `bg-admin-void`, `via-admin-void`, `bg-admin-void/50`, `bg-admin-surface-2` | 5.2 |
| `app/admin/shared/ui/Progressbar.tsx` | `bg-[#020815]` → `bg-admin-void` | 5.2 |
| `app/admin/styles/dashboard.css` | Sin cambios en este commit (ya corregido por el usuario) | 5.1 |

> Resto de hallazgos (1.x–4.x, 5.5, 6.x, 7.x) quedan **solo reportados**, sin modificar código, según lo pedido. `AGENTS.md` no se genera en esta iteración.

---

## 9. Verificación

```bash
git branch --show-current  # estado-proyecto
npm run build              # pendiente de ejecutar en siguiente iteración si se requiere
npm test                   # pre-commit hook; se espera que varios suites fallen por 6.1–6.3 hasta corregir imports
```

Archivos tocados en este commit: `app/globals.css`, `app/shared/ui/Heroe.tsx`, `app/admin/analytics/components/AnalyticsCard.tsx`, `app/admin/analytics/page.tsx`, `app/admin/shared/ui/Progressbar.tsx` + este `ANALISIS_ESTADO_PROYECTO.md`.

---

## 10. Próximos pasos sugeridos (cuando se autorice)

1. Eliminar `iron-session` y `jest.config.ts`, y decidir destino de `proxy.ts`.
2. Unificar `ValuesSection` y renombrar `BaseCard` duplicados.
3. Proteger `GET /api/admin/**/[id]` con auth y mover `validateToken` a env privada.
4. Corregir imports de tests y alinear alias `@` entre `tsconfig` y `vitest`.
5. Extraer servicios a singleton con interceptor de `Authorization: Bearer`.
6. Definir estrategia i18n (ES vs EN) y corregir `AppFooter` año dinámico.
