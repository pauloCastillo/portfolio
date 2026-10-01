# Tasks

## 1. Reproducción y verificación de tipos

- [x] 1.1 Reproducir el 422 creando un proyecto sin `user_id` contra el backend local y registrar status + `detail` como evidencia en el change
- [x] 1.2 Verificar tipos de `User.id` frente a `Project.user_id` y la columna autora de `Post` y dejar constancia de la conversión necesaria

## 2. Fix backend: propiedad desde la sesión

- [x] 2.1 Inyectar `user_id = current_user.id` en `create_project` (ignorar el valor del cliente) y verificar con test de endpoint: POST sin `user_id` → 201 con dueño de sesión
- [x] 2.2 Relajar `ProjectCreate.user_id` a opcional y verificar que los tests existentes de schemas/servicios siguen pasando (`pytest`)
- [x] 2.3 Inyectar `author_id = current_user.id` en `create_post` (ignorar el valor del cliente) y verificar con test de endpoint: POST sin `author_id` → 201 con autor de sesión
- [x] 2.4 Relajar `PostCreate.author_id` a opcional y verificar que los tests existentes de schemas/servicios siguen pasando (`pytest`)
- [x] 2.5 Agregar/actualizar tests que fijen el override: `user_id`/`author_id` enviado por el cliente no prevalece sobre la sesión, y sin credenciales → 401

## 3. Proxy Next: errores accionables

- [x] 3.1 Propagar `{ error, detail }` con el status real del backend en `POST /api/admin/projects` y verificar con POST inválido que el cliente recibe el 422 y el detalle
- [x] 3.2 Propagar `{ error, detail }` con el status real del backend en `POST /api/admin/posts` y verificar igual que 3.1
- [x] 3.3 Ajustar el timeout del cliente API server-side (`app/api/config.ts`) y verificar creando un proyecto con imagen sin timeout en red local

## 4. Editor de proyectos: validación y mensajes

- [x] 4.1 Validar título y descripción no vacíos antes de enviar y verificar que el formulario bloquea el POST vacío con mensaje de campo
- [x] 4.2 Distinguir en UI 401 (sesión expirada → re-login) vs 422 (validación con detalle) vs fallo de red/timeout, y verificar cada caso mostrando el mensaje correspondiente
- [x] 4.3 Verificación end-to-end: `Save Draft` crea DRAFT visible en admin y ausente de `GET projects/published`; `Execute Deploy` crea LIVE visible en admin, en `GET projects/published` y en la sección `#proyectos` de la web

## 5. Cierre del change

- [x] 5.1 Correr `openspec validate --change project-blog-publish-fix` y dejarlo en verde
- [x] 5.2 Verificar que `PUT`/`DELETE` y lecturas públicas de projects y posts conservan su comportamiento (regresión manual o tests existentes)
