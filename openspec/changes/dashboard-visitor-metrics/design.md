# Design

## Context

See `proposal.md` (Why) for motivation. Current state shaping this design:

- `/admin/dashboard` renders mock cards from a hardcoded `cards[]` array in `src/app/admin/shared/components/MainContent.tsx`; no service is called.
- `/admin/analytics` (`src/app/admin/analytics/page.tsx`) already computes published counts client-side via `useProjects` + `usePosts` (filter on `published`), plus a 6-month `velocity` bucket pattern reusable for the daily trend.
- Backend follows router → service → repository → model (`api/app/api/v1/endpoints/posts.py`, `services/post_service.py`, `core/dependencies.py` factories). Public reads need no auth (e.g. `GET posts/published`); admin writes require `get_current_user`.
- `Base.metadata.create_all()` runs on import in `api/app/core/database.py`, so a new model creates its table implicitly; importing needs a live MySQL, tests override with SQLite in `tests/conftest.py`.
- `RootLayout` (`src/app/layout.tsx`) is a server component, so the beacon must live in a small client component mounted from it or from `src/app/page.tsx`.

## Goals / Non-Goals

**Goals:**

- Three real cards on the dashboard plus a 30-day daily-uniques trend, with loading and empty states.
- Anonymous uniqueness without cookies banner friction or third-party trackers.

**Non-Goals:**

- Per-page / per-section breakdown UI (the `path` is stored but not surfaced in v1).
- Bot filtering, funnels, sessions, or realtime counters.
- Migrating or touching `/admin/analytics` or existing publishing flows.

## Decisions

1. **Visitor identity: `visitor_id` UUID in `localStorage`, generated client-side (`crypto.randomUUID`) and sent once per session.**
   Rationale: survives dynamic IPs and shared NATs where an IP+UA hash would over/under-count; no `Set-Cookie` header means no cookie-consent requirement in most interpretations. Alternative considered: backend IP+UA hash — rejected (CGNAT/shared offices collapse many humans into one; mobile IPs rotate one human into many).
2. **Event-per-beacon rows (`visit_event`: `id`, `visitor_id`, `path`, `seen_at`) with `COUNT(DISTINCT visitor_id)` at query time.**
   Rationale: query-time distinct-count makes "repeat beacon same day doesn't inflate" true regardless of write path, and keeps per-hit data for future per-page analysis. Alternative considered: one row per visitor per day (upsert) — rejected, it discards path granularity the user already asked to keep for later. Portfolio traffic volume makes the extra rows negligible.
3. **Day boundaries in UTC, 30-day window computed server-side.**
   Rationale: single timezone avoids client/server skew; matches the existing `datetime.now(UTC)` default on `Post.published_date`. The dashboard labels days in the admin's locale but does not reinterpret buckets.
4. **Beacon via a Next.js proxy route (`/api/visits`) forwarding to FastAPI `POST /api/v1/visits`, mirroring the existing `/api/admin/*` proxy pattern.**
   Rationale: keeps the FastAPI origin out of the public client and reuses the axios/timeout setup in `src/app/api/config.ts`. The stats read goes through an admin proxy route with the existing auth-cookie flow.
5. **Stats endpoint admin-only (`get_current_user`), beacon endpoint fully public.**
   Rationale: mirrors the `posts/published` (public read) vs `POST posts/` (auth) split; visit data is only exposed to admins.
6. **Content counts computed client-side from existing feeds (`usePosts`/`usePosts`-style published filter), not new count endpoints.**
   Rationale: zero backend change for 2 of 3 metrics; identical numbers to `/admin/analytics` by construction. A dedicated count endpoint is left as a later optimization if lists grow large.

## Risks / Trade-offs

- [Risk] `localStorage` cleared / private mode / second browser counts one human twice → Accepted: "unique browsers" is the documented meaning, standard for anonymous analytics.
- [Risk] Ad-blockers may block the beacon → Mitigation: beacon is same-origin via the Next proxy (not a known tracker URL) and fire-and-forget, so a block degrades counts, not UX.
- [Risk] Same visitor beaconing many times a day writes many rows → Mitigation: client sends once per session (`sessionStorage` guard); volume is portfolio-scale.
- [Risk] `create_all` on import means the new table appears in prod on next deploy without a migration → Accepted (matches current project practice per AGENTS.md); no backfill needed, empty state covers day one.
- [Risk] Admin's own visits inflate counts → Accepted for v1; documented non-goal, no exclusion filter.

## Migration Plan

1. Deploy backend first (new `visits` endpoints + model; table auto-created, additive, no downtime).
2. Deploy frontend (beacon component + dashboard cards/chart reading stats endpoint with empty-state fallback).
3. Rollback: revert frontend; backend endpoints are additive and safe to leave. No data migration in either direction.
