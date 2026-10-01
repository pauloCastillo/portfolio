# Evidencia — tarea 1.1 (repro 422)

Reproducido el 2026-09-27 con `TestClient` (misma pila que el suite existente),
enviando el payload tal cual lo manda el frontend (sin `user_id` / `author_id`).

## `POST /api/v1/projects/` sin `user_id`

- **Status:** `422`
- **Detail:**
  ```json
  {"detail": [{"type": "missing", "loc": ["body", "user_id"], "msg": "Field required",
    "input": {"title": "Repro Project", "description": "Sin user_id, como lo envia el frontend", "published": false}}]}
  ```

## `POST /api/v1/posts/` sin `author_id`

- **Status:** `422`
- **Detail:**
  ```json
  {"detail": [{"type": "missing", "loc": ["body", "author_id"], "msg": "Field required",
    "input": {"title": "Repro Post", "content": "Sin author_id, como lo enviaria el frontend", "published": false}}]}
  ```

El proxy Next convierte ambos en `{ error: 'Error al crear ...' }` con el status
propagado, y el formulario muestra "Error al guardar proyecto" /
"Error al desplegar proyecto". El test temporal usado (`tests/test_repro_422.py`)
se eliminó tras capturar esta evidencia.

## Tipos — tarea 1.2 (sin conversión necesaria)

- `User.id`: `Mapped[str]`, PK `String`, default `str(uuid4())` (`users.py:13`).
- `Project.user_id`: `Mapped[str]`, `String` FK → `user.id` (`projects.py:17`).
- `Post.author_id`: `Mapped[str]`, `String` FK → `user.id` (`posts.py:14`).
- Conclusión: `current_user.id` ya es `str` y encaja directo en ambas columnas;
  no se requiere conversión de tipos.
- Hallazgo asociado: los DTOs declaran `user_id: UUID` / `author_id: UUID4`,
  por lo que pydantic convierte el `str` en objeto `uuid.UUID`; el repositorio
  persiste con `Model(**data.model_dump())` y SQLite no bindea objetos `UUID`
  a columnas `String` → `500 Failed to create Project`. El fix asigna `str`
  en el endpoint (pydantic v2 no revalida en asignación) para que al
  repositorio llegue siempre un `str`.

## Timeout — tarea 3.3

- Latencia backend local (`GET projects/published`, 3 muestras): 85ms / 11ms / 7ms.
  El timeout de 1s no dejaba margen para arranques en frío ni multipart de hasta 30MB.
- Cambio: `app/api/config.ts` → `timeout: 10000`; `upload/image/route.ts` → `timeout: 60000` en el POST.
- Verificación: upload real de 5MB vía `POST /api/v1/projects/upload/image` con auth
  → `201` en 0.07s, `path: /public/media/repro_*.png` (archivo limpiado tras la prueba).
  Test temporal `tests/test_upload_timing.py` eliminado; el pin de config vive en
  `client/app/api/config.test.ts`.

## Flujo draft → deploy — tarea 4.3

Verificado a nivel API (test temporal `tests/test_flow_tmp.py`, eliminado tras la prueba):

- `POST /projects/ {published: false}` → `201`, `published=False` (id=1).
- `GET /projects/published` → no contiene id=1 (draft oculto). OK.
- `PUT /projects/1 {published: true}` → `200`, `published=True`.
- `GET /projects/published` → contiene id=1 (deploy visible en el feed que
  consume la sección pública `#proyectos`). OK.
- Lado cliente fijado con tests: `Save Draft` envía `published: false`
  (`page.test.tsx`); `Execute Deploy` reutiliza el mismo payload con
  `published: true` (misma ruta de código, verificado por inspección).
- Límite honesto: el e2e con navegador (admin logueado clicando botones)
  no se ejecutó por requerir credenciales de sesión reales.
