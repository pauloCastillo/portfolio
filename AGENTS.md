# AGENTS.md — Portfolio (Next.js + FastAPI monorepo)

Flat layout: Next.js App Router code lives in `src/` (`src/app/`, `src/lib/`,
`src/services/`, `src/store/`, `src/utils/`), Next.js configs + `package.json`
at the repo root; FastAPI backend lives in `api/` (`api/main.py`, `api/app/`,
`api/tests/`). `package.json` scripts run from the repo root; pytest/uvicorn
run from `api/`.

## Client (root + `src/`) — Next.js 16 + React 19 + TypeScript

- Stack: Next.js App Router, TypeScript strict, Tailwind CSS v4, Redux Toolkit,
  axios, react-markdown + remark-gfm + rehype-sanitize, zod, Framer Motion.
- Path aliases (see `tsconfig.json`, `vitest.config.ts`): `@/*` → `src/app/*`,
  `~/*` → `src/*`. Both files must stay in sync.
- Specs live in `openspec/` (`specs/`, `changes/`, `changes/archive/`).
  Check them before changing admin/blog/project publishing flows.

Commands (run in repo root):

```bash
npm run dev            # next dev
npm run build          # next build (production check)
npm run lint           # eslint
npm run test           # vitest WATCH — local only, never in CI/hooks
npx vitest run         # single run (use in CI, pre-commit, agents)
npx vitest run <path>  # single file
npx playwright test    # e2e; specs live in _tests/ (excluded from vitest)
```

Conventions:

- App Router only (`app/`). Shared UI in `app/shared/ui/`, admin UI in
  `app/admin/`, API proxy routes in `app/api/`, global state in `store/`,
  data fetching in `services/`, helpers in `lib/` + `utils/`.
- Env: `.env*` files are gitignored. Public base URL is
  `NEXT_PUBLIC_BASE_URL` — do not read `process.env.BASEURL` (undefined).
- `sitemap.ts` / `robots.ts` must use `NEXT_PUBLIC_BASE_URL` and must not emit
  fragment URLs (`/#...`).
- Axios default timeout lives in `app/api/config.ts` — keep it sane (>1s).
- Auth cookie (`httpOnly`) is set in `app/api/auth/login/route.ts`; do not
  also return the raw JWT in the JSON body.
- Auth is email/password only (`app/auth/page.tsx` + `app/api/auth/login/`).
  Google OAuth was removed intentionally so no one outside the org can enter
  admin — do not reintroduce `/api/auth/google`, `loginWithGoogle`,
  `GOOGLE_OAUTH_URL`, or the `lh3.googleusercontent.com` remotePattern.
- Husky pre-commit must call `vitest run`, never bare `vitest` (watch hangs).
- Public navbar (`app/shared/ui/Navbar.tsx`) is minimalist off-home: on
  `/blog` and `/blog/[slug]` it renders only `Home (/) + Blog (/blog)`.
  Logo is always `<Link href="/">`; section anchors (`#...`) only exist on
  `/`, so the CTA is `<Link href="/#contacto">` off-home and the
  `IntersectionObserver` only runs on `/`. Do not use `scrollTo()`
  (`getElementById(...).scrollIntoView`) outside `/` — it no-ops.
- i18n (`lib/i18n.ts`): `NavKey` derives from the `es` dictionary; every new
  `nav` key must be added to BOTH `es` and `en` (`lib/i18n.test.ts` enforces
  identical keys).
- Component tests (`*.test.tsx`, jsdom): `vitest.config.ts` has no
  `globals: true`, so `@testing-library/react` auto-cleanup does NOT run —
  add `afterEach(() => cleanup())` when a file renders more than once.
  jsdom lacks `IntersectionObserver` — stub it in `beforeAll` for components
  using it (e.g. Navbar).
- `npm run lint` is currently broken (ESLint 10 vs `eslint-config-next`'s
  `eslint-plugin-react`: `contextOrFilename.getFilename is not a function`,
  fails on untouched files). Until fixed, verify with `npx tsc --noEmit`
  plus `npm run build`.

## Server (`api/`) — FastAPI + SQLAlchemy 2 + Pydantic v2

- Architecture: `app/api/v1/` (routers) → `app/services/` → `app/repositories/`
  + `app/domain/`; cross-cutting in `app/core/` (`config.py`, `database.py`,
  `jwt.py`); legacy `app/db/` exists.
- DB: MySQL via PyMySQL (`DATABASE_URL`). Env files (`.env`, `.env.local`) are
  gitignored and contain real secrets — never commit them.
- Entry point: `main.py` (`/health`, router prefix `/api/v1`, docs at
  `/api/docs`). `sys.path` hack in `main.py` allows bare `from core...` imports.
- Env: `api/app/core/database.py` loads `.env.local` from the repo root via an
  absolute path — keep it that way so it works with cwd `api/` or repo root.

Commands (run in `api/`, venv at `api/.venv/`):

```bash
source .venv/bin/activate
uvicorn main:app --reload --port 8000
pytest                    # full suite (pytest.ini: tests/, --cov=app)
pytest tests/test_x.py    # single file
pytest -m "unit"          # markers: unit, integration, slow
alembic upgrade head      # apply pending DB migrations (run in api/)
alembic revision --autogenerate -m "msg"  # new migration after model changes
```

Conventions:

- DB schema is managed with Alembic (`api/alembic/`, baseline `0001_baseline`).
  Never create tables by hand or via `create_all`: change the model in
  `app/db/models/`, then `alembic revision --autogenerate -m "msg"` and review
  the diff before `alembic upgrade head`. Known historic drift exists between
  the live DB and the models (column lengths, nullability, index/FK names from
  pre-Alembic DDL) — do NOT autogenerate a cleanup migration for it; only
  migrate intentional model changes. All `String` columns MUST declare a length
  (`String(36)` for UUIDs) or MySQL DDL fails.
- `requirements.txt` = prod, `requirements-dev.txt` = test/lint tooling.
- `Base.metadata.create_all()` no longer runs on import in
  `app/core/database.py` — importing `main`/`core.database` must stay side-effect
  free (engine connects lazily, so no live MySQL is needed to import).
  Tests override with SQLite in `tests/conftest.py`. Do not add more
  import-time side effects; prefer migrations / explicit flags.
- Empty collection GETs should return `200 []`, not 404.
- File uploads (`endpoints/projects.py`): never accept `image/svg+xml`
  (stored XSS under `/public/media`); do not trust `UploadFile.size`
  (missing on some Starlette versions — use `await file.read()` + length check).
- JWT expiry and cookie `maxAge` in login route must stay consistent.
- Logout cookie attributes (`sameSite`, `path`) must match login or the
  browser keeps the original cookie.
- CORS origins live in `main.py` — add the production domain when deploying;
  `http://localhost:3306` entry is a mistake (MySQL port).

## Git / hygiene

- Branch `main` tracks `origin/main`. The repo was flattened from
  `client/`+`server/` to root+`src/`+`api/` — check `git status` before
  committing (many renames still unstaged).
- Never commit: `.env*`, `node_modules/`, `.next/`, `api/.venv/`,
  `__pycache__/`, `*.pyc`, `test-results/`, `playwright-report/`. The backend
  has no committed `.pyc` files — keep it that way.
- Frontend standardizes on npm (`package-lock.json` is gitignored, matching the
  previous `client/` setup); do not reintroduce `yarn.lock`. No
  `packageManager` field pinned yet.
- Verify before finishing: `npx vitest run` in the repo root and `pytest` (or
  at least the touched test file) in `api/`; `npm run build` for client
  production checks.
