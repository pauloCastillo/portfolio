# Proposal

## Why

Crear un proyecto nuevo desde `INITIALIZE PROJECT` siempre falla: tanto `Save Draft` ("Error al guardar proyecto") como `Execute Deploy` ("Error al desplegar proyecto") terminan en error porque el backend exige `user_id` en el cuerpo del POST, dato que el frontend nunca envía. El blog tiene el mismo defecto latente con `author_id`. Sin este fix no se puede publicar contenido nuevo.

## What Changes

- El backend deriva el propietario del contenido desde la sesión (`current_user`) en lugar de exigirlo al cliente:
  - `POST projects/` usa `current_user.id` como `user_id`; ignora cualquier `user_id` enviado por el cliente.
  - `POST posts/` usa `current_user.id` como `author_id`; ignora cualquier `author_id` enviado por el cliente.
- `ProjectCreate.user_id` y `PostCreate.author_id` dejan de ser requeridos en el contrato cliente-servidor.
- El proxy Next (`/api/admin/projects`, `/api/admin/posts`) propaga el detalle real del error del backend (422/401) en lugar de enmascararlo con un mensaje genérico.
- El editor de proyectos valida título y descripción no vacíos antes de enviar y distingue sesión expirada (401) de error de validación (422) y de fallo de red/timeout.
- Revisión del timeout de 1s del cliente API, insuficiente para uploads de imagen.

## Capabilities

### New Capabilities

- `project-publishing`: crear proyectos como borrador (`published: false`, visible solo en admin) o publicados (`published: true`, visibles en admin y en la sección pública `#proyectos`), con propiedad asignada por el servidor desde la sesión.
- `post-publishing`: crear posts como borrador o publicados con autoría asignada por el servidor desde la sesión (alcance backend + proxy; el editor visual de posts queda fuera, ver Impact).

### Modified Capabilities

- Ninguna. `admin-user-management` (única spec existente) no cambia.

## Impact

- Servidor: `server/app/api/v1/endpoints/projects.py`, `server/app/api/v1/endpoints/posts.py`, `server/app/db/schemas/project_dto.py`, `server/app/db/schemas/post_dto.py`. Cambio de contrato: clientes que enviaban `user_id`/`author_id` los verán ignorados.
- Cliente: `client/app/api/admin/projects/route.ts`, `client/app/api/admin/posts/route.ts`, `client/app/admin/projects/edit/page.tsx`, `client/app/api/config.ts` (timeout).
- Fuera de alcance: editor visual de posts (el botón `NEW POST` hoy no navega a ningún editor); se deja para un change posterior. Comportamiento de `PUT`/`DELETE` y endpoints públicos de lectura no cambian.
