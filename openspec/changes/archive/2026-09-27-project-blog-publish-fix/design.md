# Design

## Context

See `proposal.md` (Why) for motivation. Current state, verified by reading the code:

- `server/app/db/schemas/project_dto.py` — `ProjectCreate.user_id: UUID` required; `post_dto.py` — `PostCreate.author_id: UUID4` required.
- `server/app/api/v1/endpoints/projects.py::create_project` and `posts.py::create_post` both receive `current_user` via `get_current_user` (JWT `sub` → DB user) but never use it; the DTO goes straight to `service.create` → repository.
- `client/app/admin/projects/edit/page.tsx::buildPayload` sends no `user_id`; there is no blog editor at all (`NEW POST` button has no handler). So every create fails FastAPI validation with `422` before touching the DB.
- The Next proxy (`app/api/admin/projects/route.ts`, `app/api/admin/posts/route.ts`) swallows the backend `detail` and returns a generic message, which is why the UI can only show "Error al guardar/desplegar".
- `app/api/config.ts` sets `timeout: 1000` ms on the server-side axios client, shared by CRUD and image upload (up to 30 MB).

## Goals / Non-Goals

**Goals:**

- Make project creation work for both `Save Draft` and `Execute Deploy` with ownership derived server-side.
- Apply the identical authorship fix to posts so the blog API is ready before its editor UI exists.
- Surface actionable errors (401 vs 422 vs network) to the admin UI.

**Non-Goals:**

- Blog editor UI (separate future change).
- Changing `PUT`/`DELETE` semantics, public read endpoints, or the `LIVE`/`DRAFT` badge logic (already correct in `ProjectCard.tsx` and `ProjectsSection.tsx`).
- Auth redesign (token refresh, `users/me` enrichment).

## Decisions

1. **Derive ownership in the endpoint, not in the repository/service.**
   The endpoint already has `current_user`; constructing the create payload there (`ProjectCreate(..., user_id=current_user.id)`) keeps `BaseService`/`GenericRepository` untouched and mirrors how `delete`/`update` already trust `current_user` for authorization. Alternative (frontend sends id from `users/me`) rejected: spoofable and `me` currently returns only email.

2. **Make `user_id`/`author_id` optional in the create DTOs (default `None`), resolved server-side.**
   Keeps backward compatibility with any client still sending the field (it gets overridden, never trusted). Alternative (remove the field entirely) rejected: breaks existing API consumers and server tests that construct the DTO with an id.

3. **Propagate backend error detail through the Next proxy.**
   Return `{ error, detail }` with the upstream status instead of a fixed string, so the edit page can branch on 401/422/5xx. No new error taxonomy invented; the proxy stays a thin pass-through.

4. **Validate title/description client-side before POST, keep server as authority.**
   Cheap guard against the `min_length=1` 422s; server validation remains the source of truth per the specs.

5. **Raise the server-side axios timeout (1s → 10s, upload path longer or unbounded).**
   1s is below any reasonable p99 for DB writes, let alone multipart uploads. Exact value calibrated during implementation against local backend latency.

## Risks / Trade-offs

- [Risk] `User.id` type (str/UUID) may not match `Project.user_id: String` / post author column → **Mitigation**: verify column types and add a conversion + test before wiring.
- [Risk] Existing server tests construct `ProjectCreate`/`PostCreate` with explicit ids → **Mitigation**: optional-with-override keeps them compiling; update assertions for ownership-override behavior.
- [Risk] Raising timeout masks a slow backend → **Mitigation**: only raise to a sane value (10s) and keep error surfacing; performance work is out of scope.
- [Risk] `PUT projects/${id}` (no trailing slash) vs `POST projects/` may behave differently under strict-slash routing → **Mitigation**: verify update path during implementation; normalize if needed (no spec change: update semantics unchanged).
- [Trade-off] Overriding a client-sent `user_id` silently vs rejecting with 400: override chosen for robustness; logged server-side for auditability.

## Migration Plan

1. Deploy server change first (backward compatible: old clients sending ids keep working, ids ignored).
2. Deploy client changes (proxy detail + form validation + timeout).
3. Verify: create draft project → DRAFT in admin, absent from web; deploy → LIVE + visible in `#proyectos`; create post via API without `author_id` → 201.
4. Rollback: revert server commit; old 422 behavior returns, no data migration involved (no schema change).

## Open Questions

- None blocking. Blog editor scope confirmed as follow-up change.
