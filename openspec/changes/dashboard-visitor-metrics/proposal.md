# Proposal

## Why

El dashboard de admin (`/admin/dashboard`) muestra métricas falsas hardcodeadas (`MainContent.tsx`: "Total Views 12.5K", "System Uptime 99.9%") mientras los conteos reales de contenido ya existen solo en `/admin/analytics`. El administrador no puede ver de un vistazo cuántos blog-posts publicados, cuántos proyectos realizados y cuántos usuarios únicos visitaron el sitio con su tendencia diaria.

## What Changes

- Reemplazar las 4 cards mock de `/admin/dashboard` (`MainContent.tsx`) por 3 cards reales: blog-posts publicados, proyectos publicados, usuarios únicos (con desglose hoy / últimos 7 días / últimos 30 días).
- Agregar gráfica de tendencia diaria de usuarios únicos (últimos 30 días) en el dashboard, reutilizando el patrón visual de `Publishing Velocity` de analytics.
- Agregar tracking público de visitas con identidad anónima: el sitio público genera un `visitor_id` UUID (localStorage), lo envía una vez por sesión a un endpoint público; el backend registra eventos con `visitor_id`, `path` y `seen_at`.
- Agregar endpoints públicos `POST /api/v1/visits` (registrar evento) y `GET /api/v1/visits/stats` (totales + serie diaria de únicos), más servicio/repositorio/modelo correspondientes.
- Guardar `path` desde el día 1 en cada evento aunque la v1 solo muestre tendencia global (deja abierto el corte por página sin migrar).

## Capabilities

### New Capabilities

- `dashboard-metrics`: métricas reales del dashboard admin — conteos de publicados (blog, proyectos) y usuarios únicos con tendencia diaria (hoy / 7d / 30d + serie de 30 días).

### Modified Capabilities

Ninguna. `post-publishing` y `project-publishing` no cambian (solo se leen sus feeds de publicados para contar).

## Impact

- Frontend: `src/app/admin/dashboard/` (`MainContent.tsx`, cards), nuevo componente cliente de beacon en el sitio público (`src/app/`), nuevo hook/servicio `useVisitStats` + `services/visit.ts`. Sin cambios a `/admin/analytics`.
- Backend: nuevo modelo `VisitEvent`, endpoints `visits`, migración implícita vía `Base.metadata.create_all()` en `api/app/core/database.py`.
- Sin dependencias nuevas. Sin cambios a auth, CORS (revisar origen público si el beacon va cross-origin) ni a specs existentes.
