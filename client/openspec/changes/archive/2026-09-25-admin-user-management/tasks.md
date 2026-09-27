# Tasks

## 1. Backend: `phone` opcional

- [x] 1.1 Relajar `UserBase.phone` a `str | None = None` en `server/app/db/schemas/user_dto.py` y verificar que `POST /users/` acepta payload sin `phone` (test manual con `TestClient` o curl contra dev).
- [x] 1.2 Cambiar la columna `phone` a `nullable=True` en `server/app/db/models/users.py`, generar/aplicar la migracion Alembic y verificar `SELECT` sobre `user` tras migrar.
- [x] 1.3 Corregir `test_create_user` en `server/tests/test_endpoints.py` para usar `auth_client` (endpoint protegido) y agregar caso sin `phone`; verificar con `pytest tests/test_endpoints.py -k user`.

## 2. Frontend: validaciones y tipos

- [x] 2.1 Agregar `UserCreateSchema` (password `z.string().min(6)`, phone opcional) en `client/utils/validations.ts` sin alterar el `UserSchema` de login; verificar con `vitest` cubriendo password de 5 (rechaza), 6 (acepta) y payload sin phone (acepta).
- [x] 2.2 Agregar tipos `User` y `UserCreatePayload` en `client/app/types/user.ts`; verificar con `tsc --noEmit`.

## 3. Frontend: BFF + servicio de usuarios

- [x] 3.1 Crear `client/app/api/admin/users/route.ts` (GET lista, POST crear) reenviando `Authorization` via `getAuthorizationHeaders()` con 401 si no hay sesion; verificar con curl logueado (GET 200) y sin sesion (401).
- [x] 3.2 Crear `client/app/api/admin/users/[id]/route.ts` (GET/PUT/DELETE) incluyendo bloqueo de auto-borrado (comparar `sub` del JWT de sesion con el email objetivo, 403 si coinciden); verificar DELETE propio devuelve 403 y DELETE ajeno reenvia al backend.
- [x] 3.3 Crear `client/services/user.ts` (`getAllUsers/createUser/updateUser/deleteUser/toggleActive` contra `/api/admin/users`); verificar con test de servicio mockeando axios (lista y creacion OK, 401 propaga mensaje).

## 4. Frontend: pagina Users + sidebar

- [x] 4.1 Crear `client/app/admin/users/page.tsx` (lista + modal/form crear-editar + activar/desactivar + eliminar con `confirm()`, boton propio deshabilitado) siguiendo el patron visual de `app/admin/blog/page.tsx`; verificar render con datos mock y estados vacio/cargando.
- [x] 4.2 Agregar entrada Users al sidebar en `client/app/admin/shared/components/SidebarContainer.tsx`; verificar navegacion `/admin/dashboard` -> Users visible y accesible.
- [x] 4.3 Verificacion de integracion del grupo: con backend dev corriendo, crear un usuario de prueba desde el panel, editarlo, desactivarlo (login rechazado) y reactivarlo; luego eliminar el usuario de prueba.
- [x] 4.4 Enforcement de `isActive` en backend (opcion 1): 401 en `POST /auth/login` y en `get_current_user` para inactivos + 2 tests nuevos; verificado en vivo (login 401 y API 401 con sesion previa).

## 5. Recambio del usuario existente (opcion b, en prod/dev real)

- [x] 5.1 Crear el usuario nuevo desde `/admin/users` y verificar que aparece en la lista como activo.
- [x] 5.2 Iniciar sesion con la cuenta nueva en ventana/incognito aparte y verificar acceso total a `/admin/*`.
- [x] 5.3 Eliminar el usuario viejo desde la sesion nueva y verificar que su sesion queda invalidada (redirect a `/auth`) mientras la nueva sigue operativa.
  - Nota de ejecucion: el email pedido (`xpropollo@gmail.com`) era el de la cuenta existente
    (unicidad impide duplicarlo) y su hash ya correspondia a la password indicada; se ejecuto
    reemplazo de credencial en sitio (backup previo en `/tmp/user_backup_20260925.sql`, hash
    re-generado, login backend + BFF + listado verificados 200). No habia fila separada que
    borrar y se conservo el id/relaciones (proyectos/posts).
