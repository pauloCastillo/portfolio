#!/bin/sh
# Arranque del servicio Docker único: uvicorn (loopback) + nginx (público).
# Render inyecta $PORT; local por defecto 8080.
set -eu

PORT="${PORT:-8080}"
NGINX_CONF="/app/nginx.conf"

# Nginx escucha el puerto público de Render.
sed -i "s/listen 8080;/listen ${PORT};/" "$NGINX_CONF"

# Docs: solo se deniegan en el proxy cuando la app también las apaga.
# Cualquier valor distinto de "false" (dev/local) retira el bloque.
if [ "${ENABLE_DOCS:-}" != "false" ]; then
  # shellcheck disable=SC2180
  sed -i '/# DOCS_DENY_BEGIN/,/# DOCS_DENY_END/d' "$NGINX_CONF"
fi

mkdir -p /tmp/nginx-body /app/public/media

# uvicorn solo en loopback: el exterior entra únicamente por nginx.
python -m uvicorn main:app --host 127.0.0.1 --port 8000 &
exec nginx -c "$NGINX_CONF" -g "daemon off;"
