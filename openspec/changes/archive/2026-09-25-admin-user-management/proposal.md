# Proposal

## Why

Hoy no existe ninguna forma de crear cuentas de usuario desde el panel admin: el frontend solo ofrece login y el unico endpoint de creacion (`POST /users/` en el backend) exige una sesion autenticada que nadie puede obtener para un usuario nuevo. El proyecto necesita que un administrador ya logueado pueda gestionar cuentas (crear, listar, editar, desactivar, eliminar) y ejecutar el recambio del usuario actual por uno nuevo desde cero.

## What Changes

- Nueva seccion **Users** en el panel admin (`/admin/users`) con gestion completa: listar, crear, editar/desactivar, eliminar.
- Nuevas rutas BFF en Next.js (`/api/admin/users` y `/api/admin/users/[id]`) que reenvian al backend con el token de sesion (mismo patron que `projects`).
- Nuevo servicio frontend `services/user.ts` + tipos `User`/`UserCreate` en `app/types/`.
- Entrada **Users** en el sidebar del admin.
- **BREAKING (datos/validacion):** `phone` pasa de obligatorio a opcional — cambio en DTO del backend (`user_dto.py`), modelo (`users.py`, `nullable=True` + migracion) y formulario.
- Validacion de password del frontend se relaja a minimo 6 caracteres (igual que el backend); se eliminan los requisitos de complejidad (mayus/minus/numero/especial).
- Correccion del test `test_create_user` (usa cliente sin auth contra un endpoint protegido; debe usar `auth_client`).
- Guardarrail de auto-borrado: un admin no puede eliminarse a si mismo desde el panel.
- Operacion de datos (opcion b): crear el usuario nuevo desde el panel, verificar su login y luego eliminar el usuario existente.

## Capabilities

### New Capabilities

- `admin-user-management`: gestion de cuentas de usuario por administradores autenticados desde el panel (CRUD completo, validaciones relajadas de `phone`/`password`, protecciones de auto-borrado y recambio de usuario).

### Modified Capabilities

- Ninguna (no existen specs previas en el proyecto).

## Impact

- **Frontend (`client/`):** `app/admin/users/page.tsx`, `services/user.ts`, `app/api/admin/users/**`, `app/admin/shared/components/SidebarContainer.tsx`, `app/types/user.ts`, `utils/validations.ts`.
- **Backend (`server/`):** `app/db/schemas/user_dto.py` (`phone` opcional), `app/db/models/users.py` (columna `nullable`), migracion de DB, `tests/test_endpoints.py` (fix auth en `test_create_user`).
- **Datos:** recambio del usuario existente (crear -> verificar -> borrar, en ese orden para no perder acceso).
- Sin registro publico: el alcance `/auth` y los endpoints publicos no cambian.
