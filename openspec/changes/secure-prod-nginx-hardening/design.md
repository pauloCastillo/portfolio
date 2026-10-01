# Design

## Context

See `proposal.md` (Why). Current state observed in repo:

- `api/main.py`: CORS hardcoded (`localhost:3000`, `8080`, `localhost:3306`), `allow_headers=["*"]`, docs always on (`/api/docs`, `/api/redoc`), static mount `/public/media`.
- `api/app/core/config.py`: solo JWT + mail settings; sin `ENV`, sin CORS, sin docs flag.
- `api/app/core/database.py`: `echo=True` fijo, `create_all` en import.
- `api/app/api/v1/endpoints/projects.py:upload_image`: acepta `svg+xml`, confía en `file.size`, filename `stem + timestamp`, `file.file.read()` sin límite previo.
- Sin `Dockerfile` / `nginx.conf` / `render.yaml`; `api/requirements.txt` sin `slowapi` ni `Pillow`.
- Render free: filesystem efímero, sleep por inactividad, una sola instancia en la práctica.

## Goals / Non-Goals

Goals: cerrar superficie con un solo servicio Docker (Nginx público + uvicorn loopback), CORS por entorno, docs off en prod, doble capa de rate-limit, upload estricto.

Non-Goals: WAF completo / bot management; migración de `/public/media` a object storage (se documenta como follow-up); revocación de JWT / refresh rotation; CSP fina del front (solo headers base de backend aquí).

## Decisions

1. **Single Docker service (`nginx :80` → `uvicorn 127.0.0.1:8000`) en vez de dos servicios Render.**
   Rationale: free tier cobra horas por servicio y duerme cada uno; un contenedor evita doble cold-start y expone un solo puerto público (`$PORT`). Alternativa (dos servicios: nginx público + api privada) descartada por coste/complejidad en free.

2. **CORS por env: `FRONTEND_URL` + `EXTRA_CORS_ORIGINS` (coma-separada) + `ALLOW_LOCALHOST_DEV` (bool).**
   Rationale: prod queda cerrado a Vercel + backend; `http://localhost:3000` solo entra con opt-in explícito para dev contra backend remoto. Alternativa (hardcodear dominios) descartada: filtra URLs a git. `http://localhost:3306` se elimina.

3. **Docs con flag: `ENABLE_DOCS` default `true` en dev, `false` cuando `ENV=prod`.**
   Rationale: en `main.py` pasar `docs_url=None, redoc_url=None` cuando el flag es off. Nginx además hace `deny all` a `^/api/(docs|redoc|openapi.json)` en prod como segunda capa (cubre olvidos de flag).

4. **Rate-limit doble capa: Nginx `limit_req` (primaria) + `slowapi` (fallback).**
   Zonas: `login 5r/m burst 2`, `forgot 3r/h burst 1`, `general 100r/m`. Rationale: Nginx corta antes de Python (CPU/mem) y añade `Retry-After`; `slowapi` cubre el caso de que uvicorn quedara expuesto directo. Alternativa (solo slowapi) descartada: el abuso igual llega a Python y en free cada CPU cuenta.

5. **Body-size diferenciado en Nginx: `client_max_body_size 1m` global, `31m` solo en `location = /api/v1/projects/upload/image`.**
   Rationale: el default duro bloquea JSON gigantes; el upload necesita 30MB + overhead multipart. La app además re-valida por bytes leídos.

6. **Upload estricto con Pillow (no `python-magic`).**
   Rationale: Pillow no requiere `libmagic` del sistema (imagen Docker más simple), permite `Image.open(BytesIO(data)).verify()` + allowlist de `format in {PNG, JPEG, WEBP}` y mapea a extensiones seguras. `python-magic` daría mejor sniffing pero añade dependencia nativa. Tamaño vía `data = await file.read(); len(data)` (nunca `file.size`), filename `secrets.token_hex(16) + ext`, rechazo explícito de `svg+xml` aunque el sniff diga XML.

7. **Headers en Nginx (no middleware FastAPI).**
   `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer` en respuestas API y estáticos. Rationale: un solo lugar cubre también `/public/media`; añadir middleware duplicaría y podría divergir.

8. **`ENV`-gated `echo`: `create_engine(..., echo=(ENV != "prod"))`.**
   Rationale: evita PII en logs de Render sin perder debug local.

## Risks / Trade-offs

- [Render free efímero] Uploads en disco se pierden en redeploy/sleep → Mitigación: documentar como limitación conocida, proponer R2/S3 como follow-up; no se finge persistencia.
- [Rate-limit en memoria] Zonas Nginx y `slowapi` son por instancia; con >1 réplica un atacante distribuye → Mitigación: aceptado en free (una instancia); si se escala, mover a Redis.
- [Pillow decompression bomb] Imagen válida pero gigante en píxeles → Mitigación: `Image.MAX_IMAGE_PIXELS` explícito + límite 30MB antes del decode.
- [Nginx y app en el mismo contenedor] Si Nginx cae, cae todo → Mitigación: `start.sh` simple (nginx foreground + uvicorn), healthcheck a `/health` vía Nginx; aceptado por simplicidad free.
- [SVGs históricos] Los ya subidos siguen servidos → Mitigación: fuera de alcance; se recomienda barrido manual y borrado.
- [Cold-start + 429] `burst` agresivo + sleep de Render puede dar 429 a usuarios legítimos tras despertar → Mitigación: `burst` con `nodelay` en login/forgot para absorber picos cortos.

## Migration Plan

1. Añadir settings (`ENV`, `FRONTEND_URL`, `EXTRA_CORS_ORIGINS`, `ALLOW_LOCALHOST_DEV`, `ENABLE_DOCS`), cablear CORS/docs/echo.
2. Endurecer `upload_image` + tests (svg rechazado, MIME spoofeado rechazado, >30MB rechazado, filename aleatorio).
3. Añadir `slowapi` + límites en los 4 endpoints de auth + test de 429.
4. Crear `api/Dockerfile` (python + nginx), `api/nginx.conf`, `api/start.sh`; `CMD ["./start.sh"]`, exponer `$PORT`.
5. En Render: servicio Docker desde `api/`, envs `ENV=prod`, `FRONTEND_URL=https://<vercel>`, `ENABLE_DOCS=false`, secretos existentes; verificar `GET /health`, CORS preflight, `GET /api/docs → 404`, rate-limit `429`, upload válido/inválido.
6. Rollback: redeploy al commit anterior (servicio nativo Python sin Docker); cambio sin migraciones de DB.

## Open Questions

- Ninguna que bloquee specs o tareas. Dato a confirmar en implementación: dominio exacto del front en Vercel para `FRONTEND_URL` (se pasa como env, no se hardcodea).
