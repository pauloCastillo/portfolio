# Servicio Docker único para Render free: nginx (público :$PORT) + uvicorn (loopback :8000).
# Render usa el $PORT que inyecta; `start.sh` lo cablea a nginx.
FROM python:3.14-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends nginx sed \
  && rm -rf /var/lib/apt/lists/* \
  && useradd --system --no-create-home --shell /usr/sbin/nologin nginx || true

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY main.py /app/main.py
COPY app /app/app
COPY nginx.conf /app/nginx.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && mkdir -p /app/public/media

EXPOSE 8080

CMD ["/app/start.sh"]
