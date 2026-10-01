# Deploy en Render (tier gratuito) — servicio Docker único

Nginx escucha el `$PORT` público y proxya a uvicorn en `127.0.0.1:8000`.
La app también aplica sus propias defensas (slowapi, CORS por entorno,
docs off, validación de upload), así que el servicio sigue protegido
aunque alguien alcanzara uvicorn directo.

## Crear el servicio

1. Render → New → Web Service → este repo.
2. **Runtime**: Docker. **Root Directory**: `api/`.
3. Plan Free (una sola instancia; el rate-limit en memoria asume esto).

## Variables de entorno (obligatorias en prod)

| Var | Valor prod | Notas |
| --- | --- | --- |
| `ENV` | `prod` | Cierra localhost en CORS, apaga `echo` SQL, apaga docs por defecto |
| `FRONTEND_URL` | `https://<tu-front-en-vercel>` | Sin trailing slash; **nunca** `localhost` en prod |
| `EXTRA_CORS_ORIGINS` | `https://<preview-vercel>,...` (opcional) | Separadas por coma |
| `ALLOW_LOCALHOST_DEV` | `false` (o ausente) | `true` solo para depurar local contra backend remoto |
| `ENABLE_DOCS` | `false` | Apaga `/api/docs`, `/api/redoc`, `/api/openapi.json` |
| `SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES` | (secretos existentes) | Igual que hoy |
| `MAIL_*`, `USER_DB`, `PASSWORD_DB`, `HOST_DB`, `PORT_DB`, `NAME_DB` | (secretos existentes) | Igual que hoy |

## Verificar tras el deploy (`APP=https://<tu-api>.onrender.com`)

```bash
curl -s -o /dev/null -w "%{http_code}\n" "$APP/health"            # 200
curl -s -o /dev/null -w "%{http_code}\n" "$APP/api/docs"          # 404
curl -sI "$APP/health" | grep -i "x-content-type-options"         # nosniff
for i in $(seq 1 8); do curl -s -o /dev/null -w "%{http_code} " -X POST "$APP/api/v1/auth/login" -H 'Content-Type: application/json' -d '{"email":"x@y.zz","password":"wrongpass1"}'; done; echo  # 401... luego 429
```

Rollback: redeploy del commit anterior (servicio Python sin Docker); sin migraciones de DB.

## Limitación conocida (free tier)

`/public/media` es **efímero**: redeploys y sleeps borran uploads.
Follow-up: migrar a object storage (R2/S3/Cloudinary). No se finge persistencia.
