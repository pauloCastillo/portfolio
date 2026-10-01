# Tasks

## 1. Configuración prod (CORS, docs, echo)

- [x] 1.1 Añadir settings `ENV`, `FRONTEND_URL`, `EXTRA_CORS_ORIGINS`, `ALLOW_LOCALHOST_DEV`, `ENABLE_DOCS` a `api/app/core/config.py` y verificar con `pytest api/tests/test_config_env.py` que prod cierra localhost sin opt-in y lo abre con opt-in
- [x] 1.2 Cablear CORS por entorno en `api/main.py` (eliminar `localhost:3306`, `allow_headers=["*"]` → lista explícita) y verificar con preflight `OPTIONS` que origen no listado no recibe `Access-Control-Allow-Origin`
- [x] 1.3 Desactivar docs en prod (`docs_url=None, redoc_url=None` cuando `ENABLE_DOCS=false`) y `echo=(ENV!="prod")` + `frontend_url` real, y verificar que `GET /api/docs` devuelve `404` con `ENV=prod` y `200` en dev

## 2. Upload estricto

- [x] 2.1 Reescribir `upload_image` en `api/app/api/v1/endpoints/projects.py`: rechazar `svg+xml`, verificar con Pillow (`format in PNG/JPEG/WEBP`), medir con `await file.read()+len()`, filename `secrets.token_hex(16)+ext`, y verificar con `pytest api/tests/test_upload_security.py` (svg rechazado, MIME spoofeado rechazado, 40MB con size ausente rechazado, png 5MB aceptado con nombre aleatorio)
- [x] 2.2 Añadir `Pillow` a `api/requirements.txt` (fijar versión) y `Image.MAX_IMAGE_PIXELS` explícito, y verificar con `pip install -r api/requirements.txt` + import Pillow OK en `.venv`

## 3. Rate-limit fallback en app

- [x] 3.1 Añadir `slowapi` a `api/requirements.txt` + limiter en `api/main.py` con handler `429` + `Retry-After`, y verificar que la app arranca y expone el handler
- [x] 3.2 Aplicar límites `login 5/min`, `forgot-password 3/h`, `reset-password 10/h`, `validate 60/min` y verificar con `pytest api/tests/test_auth_ratelimit.py` que el exceso devuelve `429` y el tráfico normal pasa

## 4. Servicio Docker único Nginx + uvicorn

- [x] 4.1 Crear `api/nginx.conf` (zonas login/forgot/general, `client_max_body_size 1m` + `31m` en upload, `deny all` a `^/api/(docs|redoc|openapi.json)`, headers `nosniff`/`DENY`/`no-referrer`, `proxy_pass 127.0.0.1:8000`) y verificar con `nginx -t -c api/nginx.conf`
- [x] 4.2 Crear `api/Dockerfile` (python + nginx, instala requirements, copia app + nginx.conf) + `api/start.sh` (sustituye `$PORT`, arranca uvicorn loopback y nginx foreground) y verificar con `docker build ./api -t portfolio-api:secure` que la imagen construye
- [x] 4.3 Documentar envs Render en `api/DEPLOY.md` (`ENV=prod`, `FRONTEND_URL`, `ENABLE_DOCS=false`, secretos existentes) y verificar siguiendo el doc contra un deploy de staging que `GET /health` responde `200` vía Nginx

## 5. Verificación integrada

- [x] 5.1 Levantar el contenedor localmente y verificar de extremo a extremo: CORS prod/opt-in, `/api/docs → 404`, `login` abusivo → `429` con `Retry-After`, upload svg → `400`, body JSON >1MB → `413`, y headers presentes en `/api/v1/*` y `/public/media/*`
