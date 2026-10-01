# Proposal

## Why

El editor markdown vive en `admin/projects/edit` donde ya no se necesita, mientras el flujo de blog está roto en tres pedazos: `admin/blog` solo lista (NEW POST muerto), la creación real está en `admin/config` Composer con un textarea plano, y el post publicado se muestra como markdown crudo (`whitespace-pre-wrap`). Hay que mover el editor a su lugar real y replicar la lógica probada de proyectos (Save Draft vs Publish + tarjetas con estado).

## What Changes

- Mueve el `MarkdownEditor` de `app/admin/projects/edit/components/` a compartido (`app/admin/shared/components/`), convertido a presentacional (`value`/`onChange`, sin botones `Save`/`Execute Deploy` acoplados).
- Crea la página real `app/admin/blog/edit` (crear sin `?id=`, editar con `?id=`): título + dropzone imagen + `MarkdownEditor` + toggles LinkedIn/X + preview renderizado + barra inferior `Save Draft` / `Publish` con estados `DRAFT - UNSAVED` / `PROCESSING...`.
- `Save Draft` guarda `published: false` (solo DB, sin share, vuelve a `/admin/blog`); `Publish` guarda `published: true` **y** dispara share a las redes marcadas (Opción A confirmada), vuelve a `/admin/blog`.
- Revive `app/admin/blog/page.tsx`: botón NEW POST y botón edit navegan a `blog/edit`; lista pasa a tarjetas grid con badge `PUBLISHED`/`DRAFT` (estilo `ProjectCard` LIVE/DRAFT), contadores y tarjeta punteada "New Post". Delete se conserva.
- El post publicado y el preview **deben renderizar markdown con `react-markdown`** (GFM + sanitize), nunca raw. Incluye soporte de imagen del post (`Post.image_file`).
- **BREAKING (UI)**: quita el editor markdown de `app/admin/projects/edit` (queda metadata + imagen + links), quita `content` del payload de crear/editar proyecto y simplifica `admin/projects/[slug]` (sin parseo manual `#/##/>`).
- Elimina el tab Composer de `app/admin/config/page.tsx` (duplicado); config queda solo config.
- Agrega dependencia `react-markdown` + `remark-gfm` + `rehype-sanitize` (verificar `@tailwindcss/typography` para clases `prose`).

## Capabilities

### New Capabilities

- `blog-post-authoring`: experiencia de autoría en `admin/blog/edit` — editor markdown compartido, imagen opcional, preview renderizado, toggles sociales, Save Draft vs Publish+share, y lista en tarjetas con estado.

### Modified Capabilities

- `post-publishing`: Publish significa `published: true` + share a redes marcadas; el post admite `image_file`; el contenido markdown se renderiza formateado en el feed público y en preview, no raw.
- `project-publishing`: el flujo admin de proyectos ya no recolecta ni edita `content` markdown (solo metadata + imagen + links); la validación requerida pasa a `title`/`description` sin `content`.

## Impact

- Código: `app/admin/projects/edit/page.tsx`, `app/admin/projects/edit/components/MarkdownEditor.tsx` (mover/borrar), `app/admin/projects/[slug]/page.tsx`, `app/admin/blog/page.tsx`, nuevo `app/admin/blog/edit/page.tsx`, nuevo `MarkdownEditor` compartido, nuevo `MarkdownRenderer` compartido, `app/blog/[slug]/page.tsx`, `app/admin/config/page.tsx`, `app/types/general.ts` (nota legacy `Project.content`), `services/post.ts` (uso existente `createPost`/`updatePost`), `package.json` (nuevas deps).
- APIs: reuso de `POST/PUT /api/admin/posts` y `GET posts/published`; imagen vía reuso de `projects/upload/image` en v1 o nuevo `posts/upload/image` (por confirmar backend).
- Sistemas: share externo vía `window.open` (LinkedIn share, X intent) disparado en el gesto de Publish; riesgo de bloqueo de popups si se desacopla del click.
