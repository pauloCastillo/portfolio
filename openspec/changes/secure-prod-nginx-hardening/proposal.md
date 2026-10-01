# Proposal

## Why

El backend FastAPI corre directo en Render (tier gratuito) sin rate-limit, con CORS de desarrollo, `/api/docs` público y un upload de imágenes que acepta SVG y confía en `UploadFile.size`. Cualquier fuerza bruta a `/auth/*` o abuso de `forgot-password` llega directo a Python. Hay que cerrar la superficie antes del deploy a producción.

## What Changes

- CORS configurable por entorno: lista cerrada en prod (dominio Vercel + backend Render) + opt-in `http://localhost:3000` para desarrollo local contra backend remoto. Se elimina el origen erróneo `http://localhost:3306`.
- Desactivar `/api/docs` y `/api/redoc` en prod mediante flag `ENV`/`ENABLE_DOCS`.
- Nuevo servicio Docker único `nginx + uvicorn` para Render: Nginx escucha el `$PORT` público y proxya a uvicorn local.
- Nginx: rate-limits (`login` 5r/m, `forgot-password` 3r/h, general 100r/m), `client_max_body_size` 1m por defecto y 31m solo en `upload/image`, headers `nosniff` + `DENY` framing + `Referrer-Policy`, `deny all` a `/api/docs|redoc` en prod.
- Upload hardening: rechazar `image/svg+xml`, validar magic bytes (Pillow), medir tamaño con `await file.read() + len()` (no `file.size`), filename aleatorio `secrets.token_hex`, límite 30MB real.
- Fallback en app con `slowapi` en `login / forgot-password / reset-password / validate` por si uvicorn quedara expuesto.
- `echo=False` de SQLAlchemy en prod y `frontend_url` de producción para links de reset.

## Capabilities

### New Capabilities
- `prod-security-hardening`: comportamiento observable de seguridad en producción — CORS por entorno con opt-in localhost, docs desactivables, rate-limits en auth, límites de tamaño de body diferenciados, headers de seguridad, y validación estricta de uploads de imagen.

### Modified Capabilities
- (vacío — ningún spec existente cubre seguridad; `admin-user-management`, `post-publishing` y `project-publishing` no cambian sus REQUIREMENTS)

## Impact

- `api/main.py` (CORS, docs flag), `api/app/core/config.py` (nuevas settings), `api/app/core/database.py` (`echo` por env), `api/app/api/v1/endpoints/projects.py` (upload), `api/requirements.txt` (`slowapi`, `Pillow`), nuevo `api/Dockerfile` + `api/nginx.conf` + `api/start.sh`.
- Comportamiento: en prod `localhost` deja de estar permitido salvo opt-in explícito; `/api/docs` devuelve 404/403; logins abusivos reciben `429`; SVGs subidos antes siguen servidos (migración fuera de alcance).
- Sistemas: Render web service pasa a Docker único; frontend Vercel debe estar en la lista CORS o falla.
