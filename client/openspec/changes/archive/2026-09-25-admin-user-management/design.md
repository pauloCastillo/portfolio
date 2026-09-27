# Design

## Context

Ver `proposal.md` (Why) y `specs/admin-user-management/spec.md` (requisitos). Estado actual verificado en codigo:

- Frontend (`client/`): `services/auth.ts` solo expone login/logout/Google/recover; `app/auth/page.tsx` es solo login; no existe `/api/admin/users` ni `services/user.ts`. El patron a replicar es `services/project.ts` + `app/api/admin/projects/route.ts` (BFF que adjunta `Bearer` via `getAuthorizationHeaders()` en `utils/helpers.ts`) + pagina de lista CRUD (`app/admin/blog/page.tsx`).
- Backend (`server/`): `POST /users/` ya implementa creacion con hash bcrypt (`UserService.create`), y existen GET/PUT/DELETE bajo `prefix="/users"` — todos exigen `get_current_user`. `UserCreate`/`UserLogin` ya usan `min_length=6`; `phone` es requerido en DTO (`user_dto.py:9`), modelo (`users.py:17`, `nullable=False`) y tests.
- Sesion: `iron-session` (`lib/session.ts`) + `proxy.ts` protege `/admin/*` con validacion contra `auth/validate` y auto-refresh.
- Tests backend: `test_create_user` (`tests/test_endpoints.py:85`) usa cliente sin auth contra endpoint protegido — roto; se corrige en este cambio.

## Goals / Non-Goals

**Goals:**

- CRUD de usuarios solo-admin reutilizando el backend existente sin nuevos endpoints publicos.
- `phone` opcional de punta a punta (DTO + modelo + migracion + form).
- Password frontend alineado a minimo 6 (Zod), sin complejidad.
- Recambio seguro del usuario actual (crear -> verificar login -> borrar).

**Non-Goals:**

- Registro publico / auto-signup (explicitamente excluido por spec).
- Roles y permisos granulares (todos los usuarios son admin; no hay RBAC en este cambio).
- Cambio de password desde el panel (el backend `UserUpdate` no lo incluye; queda fuera).
- Avatar upload (campo `avatar_url` como texto libre u omitido).

## Decisions

1. **Replicar el patron BFF existente, no llamar al backend directo desde el browser.**
   Por que: el token vive en cookie httpOnly (`portfolio_session`); el browser nunca lo ve. `app/api/admin/users/route.ts` (GET/POST) y `app/api/admin/users/[id]/route.ts` (GET/PUT/DELETE) reenvian con `getAuthorizationHeaders()`, identico a `projects/route.ts`.
   Alternativa descartada: exponer el access token al cliente — rompe el modelo de seguridad actual.

2. **Pagina `/admin/users` como client component estilo `blog/page.tsx`.**
   Por que: lista + `confirm()` en borrado + botones hover-reveal ya son el lenguaje visual del panel; minimiza divergencia.
   Servicio `services/user.ts` con `getAllUsers/createUser/updateUser/deleteUser/toggleActive` via axios a `/api/admin/users`. Tipos `User`/`UserCreatePayload` en `app/types/user.ts` (phone como `string | null`, password solo en payload de creacion).
   Alternativa descartada: server component con fetch directo — los servicios del proyecto son client-side con axios.

3. **`phone` opcional via `str | None` en `UserBase` + columna `nullable=True` + migracion.**
   Por que: el NOT NULL de la columna obliga migracion (Alembic; en dev SQLite basta recrear). El repo `UserRepository` no filtra por phone, asi que el cambio es solo schema + modelo.
   Alternativa descartada: mantener requerido y mandar string vacio — contamina datos y rompe `min_length=10` del DTO.

4. **Password: solo relajar Zod a `z.string().min(6)`; backend sin cambios.**
   Por que: el backend ya exige `min_length=6` en los tres schemas; el desalineado es solo `utils/validations.ts` (8 + regex). Se extrae un `UserCreateSchema` separado del `UserSchema` de login para no acoplar ambas validaciones.
   Alternativa descartada: endurecer backend a 8 + complejidad — contradice la decision del usuario.

5. **Auto-borrado bloqueado en dos capas: UI deshabilita el boton propio + BFF compara `sub` del token.**
   Por que: solo-UI se salta con curl. El BFF puede decodificar el `sub` (email) del JWT de sesion sin validar firma extra (ya validado por `getAuthorizationHeaders`) y comparar con el email del objetivo antes de reenviar el DELETE.
   Alternativa descartada: endpoint backend dedicado — innecesario; el BFF ya es el enforcement point.

6. **Fix `test_create_user` a `auth_client` en el mismo cambio.**
   Por que: hoy usa `client` sin token contra ruta protegida; con o sin este cambio ese test miente. Es deuda directamente tocada por el alcance.

## Risks / Trade-offs

- [Migracion `phone` en prod con filas existentes] -> `ALTER COLUMN ... DROP NOT NULL` es no-destructiva; filas con phone conservan valor; rollback = revert de migracion (la columna vuelve a NOT NULL solo si no hay NULLs — verificar antes).
- [Borrar al unico admin por error pese al guardarraíl] -> Mitigacion: orden crear->verificar->borrar + confirm dialog + bloqueo de auto-borrado; ultimo recurso: script/seed directo en `server/` (fuera de este change).
- [`GET /users/` expone hashes? No: responde `UserResponse` sin password] -> Verificado en `user_dto.py:29`; mantener asi, no agregar campos sensibles.
- [Divergencia de alias `@` entre tsconfig y vitest (`ANALISIS_ESTADO_PROYECTO.md` 7.1)] -> Los archivos nuevos usan los mismos alias que `services/project.ts` (`~/services`, `@/types`); si los tests nuevos fallan por resolucion, se documenta pero no se reestructura el aliasing en este change.
- [Falta `password` en `UserUpdate` del backend] -> Edicion desde el panel no cambia passwords; el flujo de cambio de clave sigue siendo `forgot/reset-password`. Se registra como limitacion conocida.

## Migration Plan

1. Deploy backend: DTO + modelo + migracion Alembic (`phone` nullable) + tests corregidos; verificar `POST /users/` acepta payload sin phone.
2. Deploy frontend: BFF + servicio + pagina + sidebar + validaciones.
3. Datos (opcion b, en prod): crear nuevo usuario desde `/admin/users` -> login con la cuenta nueva en ventana aparte -> eliminar usuario viejo -> confirmar sesion vieja invalidada.
4. Rollback: revert de ambos deploys; la migracion revierte solo si no existen NULLs en `phone` (chequear `SELECT COUNT(*) FROM user WHERE phone IS NULL`).

## Open Questions

- Ninguna que bloquee specs, enfoque o tareas. Detalle menor diferido a implementacion: `avatar_url` como input de texto en el form vs omitirlo (default: omitir; el modelo lo permite `nullable=True`).

## Addendum: enforcement de `isActive` (opcion 1)

Hallazgo durante 4.3: `login` y `get_current_user` no consultaban `isActive`, asi que
desactivar era solo visual. Se enforzo en `server/app/api/v1/endpoints/auth.py`
(login rechaza inactivos con el mismo 401 generico) y en
`server/app/core/dependencies.py` (`get_current_user` rechaza tokens de inactivos).
Limitacion conocida: `POST /auth/validate` (usado por `proxy.ts`) solo verifica la
firma JWT, por lo que una sesion ya emitida podria seguir navegando `/admin/*`
hasta expirar (~30 min); el login nuevo y toda la API quedan bloqueados de inmediato.
