# Tasks

## 1. Backend visit tracking (FastAPI)

- [x] 1.1 Add `VisitEvent` SQLAlchemy model (`visitor_id` String index, `path` String, `seen_at` DateTime UTC default) plus `VisitCreate`/`VisitStats` Pydantic schemas, and verify `pytest tests/` collects with the new model under SQLite in `tests/conftest.py`
- [x] 1.2 Add `VisitRepository` + `VisitService` (record event; `COUNT(DISTINCT visitor_id)` totals for today/7d/30d plus per-day 30-day series in UTC) with `get_visit_service` factory in `core/dependencies.py`, and verify new unit tests for dedupe-by-day and empty-history zero stats pass via `pytest tests/test_visits.py`
- [x] 1.3 Add public `POST /api/v1/visits` (no auth, UUID + path validation, `201`, never persists IP/UA) and admin-only `GET /api/v1/visits/stats` (`get_current_user`, `401` without credentials) wired in `router.py`, and verify endpoint tests including malformed-UUID rejection and unauthenticated-stats `401` pass

## 2. Public beacon + proxy (Next.js)

- [x] 2.1 Add `VisitBeacon` client component (reads/generates `visitor_id` UUID in `localStorage`, sends one beacon per session with `sessionStorage` guard, fire-and-forget) mounted from the public layout, and verify with a component test that a repeat mount in the same session sends no second beacon (`npx vitest run <path>`)
- [x] 2.2 Add Next proxy routes for beacon POST (public, `/api/visits`) and stats GET (admin, auth-cookie flow following the existing `/api/admin/*` pattern), and verify proxy tests pass via `npx vitest run src/app/api/visits`

## 3. Dashboard metrics UI (admin)

- [x] 3.1 Add `services/visit.ts` + `useVisitStats` hook (today/7d/30d + 30-day series, loading/error states) reusing the axios/timeout setup in `src/app/api/config.ts`, and verify hook tests (loading, error, parsed stats) pass via `npx vitest run <path>`
- [x] 3.2 Replace mock `cards[]` in `MainContent.tsx` with real cards (blog-posts publicados via `usePosts` published filter, proyectos publicados via `useProjects` published filter, usuarios únicos hoy/7d/30d) including empty-state zeros, and verify component test renders counts from mocked hooks
- [x] 3.3 Add 30-day daily-uniques trend chart reusing the `velocity` bucket visual language from `/admin/analytics`, and verify component test covers populated series and the no-data empty state

## 4. Integration verification

- [x] 4.1 Run full `npx vitest run` in repo root and `pytest` in `api/` and fix regressions, verifying both suites are green
- [x] 4.2 Run `npx tsc --noEmit` plus `npm run build` in repo root, verifying the dashboard and public site compile for production
