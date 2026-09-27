# Análisis del proyecto Portfolio — Fallas pendientes

> Generado el 2026-09-24. Los errores críticos ya corregidos (prefijo de API,
> 401→500 en `get_current_user`, expiración de token de reseteo, hashes
> expuestos en `GET /users/`, `requirements.txt`, `user_id` int vs UUID,
> `POST /users/` sin auth y suite de vitest) **no** se listan aquí.

## 🔴 Altas (seguridad / funcionalidad)

### 1. `Base.metadata.create_all()` se ejecuta al importar
- `server/app/core/database.py:31`
- Importar `main` o `core.database` conecta a MySQL. Ni los tests con SQLite
  (`server/tests/conftest.py`) pueden correr sin MySQL vivo. El DDL debería
  vivir en migraciones o tras un flag explícito, no en el import.

### 2. `__pycache__` versionado y `.gitignore` del server roto
- `server/.gitignore:5` dice `./app/_pycache__/**` (mal escrito) e ignora
  `venv/` cuando el proyecto usa `.venv/`. Decenas de `.pyc` están trackeados.
- Además `echo=True` en el engine (`database.py:20`) vuelca todo el SQL en logs.

### 3. El login expone el JWT en el cuerpo de la respuesta
- `client/app/api/auth/login/route.ts:26-29`: devuelve `token` en el JSON además
  de la cookie `httpOnly`, anulando su protección. Incoherencia: la cookie dura
  7 días pero el JWT expira en 30 minutos.

### 4. `sitemap.ts` y `robots.ts` usan una variable inexistente
- `client/app/sitemap.ts:4`, `client/app/robots.ts:10`: leen
  `process.env.BASEURL`, pero el `.env` solo define `NEXT_PUBLIC_BASE_URL`.
  El sitemap genera URLs `undefined/...`. Además incluye fragmentos (`/#...`),
  inválidos en sitemaps. Sin `metadataBase` ni OpenGraph en `layout.tsx`:
  el "SEO optimizado" del README no es real.

### 5. Timeout de axios de 1 segundo
- `client/app/api/config.ts:5`: `timeout: 1000`. Cualquier latencia normal hace
  fallar login y CRUD del admin.

### 6. Upload acepta SVG y valida mal el tamaño
- `server/app/api/v1/endpoints/projects.py:46-49`: `image/svg+xml` servido como
  estático en `/public/media` permite XSS almacenado. `file.size` no está
  garantizado en `UploadFile` (AttributeError → 500 según versión de Starlette).

### 7. Husky pre-commit bloqueante
- `client/.husky/pre-commit` corre `npm test` → `vitest` sin `run`, que queda en
  modo watch y nunca termina. Debe usar `vitest run`.

## 🟡 Medias

- **8.** `GET` de colecciones vacías responde 404 (`server/app/domain/generic_repository.py:24-28`);
  debería ser `200 []`.
- **9.** `return !response.success` en el `catch` de `client/app/hooks/useAuth.ts:32`
  (retorna éxito cuando el login falló) + `setLoading(false)` duplicado.
- **10.** Cookie de logout con `sameSite: 'strict'` vs `'lax'` en login
  (`client/app/api/auth/logout/route.ts`): el navegador puede no borrar la original.
- **11.** Doble lockfile en disco (`package-lock.json` + `yarn.lock`, ya eliminado
  este último): instalaciones no reproducibles; fijar `packageManager` en
  `client/package.json`.
- **12.** `client/jest.config.ts` huérfano (scripts usan vitest) con ruta de caché
  Windows hardcodeada.
- **13.** Configuración duplicada en el server: `config.py` (pydantic Settings) y
  `database.py` (`load_dotenv` + `os.getenv` sin defaults → `DATABASE_URL` con
  literales `None`); ambas con rutas `.env.local` relativas al CWD.
- **14.** Misceláneos: CORS incluye `http://localhost:3306` (puerto MySQL) y no
  contempla dominio productivo (`server/main.py:23`); Swagger expuesto en
  `/api/docs`; `jwt.py:6` congela settings a nivel de módulo; tabla llamada
  `user` (reservado en MySQL); `authSlice` guarda un token que nada usa;
  `errorMiddleware` importa el `store` que lo registra (dependencia circular);
  `next.config.ts` optimiza un solo paquete FontAwesome de cuatro.

## 🟢 Notas (no son fallas)

- `server/.env.local` y `client/.env` contienen credenciales reales pero **no**
  están trackeados en git. No llevar esos valores a producción.
