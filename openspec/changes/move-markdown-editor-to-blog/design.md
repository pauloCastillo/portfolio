# Design

## Context

See `proposal.md` for motivation. Current state (observed in repo): `MarkdownEditor` lives at `app/admin/projects/edit/components/MarkdownEditor.tsx` with toolbar actions plus `onSave`/`onExecuteDeploy` buttons baked inside; `app/admin/projects/edit/page.tsx` doubles as create/edit and sends `content: markdown`; `admin/projects/[slug]` parses `#/##/>` by hand. Blog creation lives in `app/admin/config/page.tsx` Composer (plain textarea + LinkedIn/X `window.open` + raw `whitespace-pre-wrap` preview); `app/admin/blog/page.tsx` lists with dead NEW POST/edit buttons; public `app/blog/[slug]/page.tsx` renders `post.content` raw. `Post` type already has `image_file`; only `projects/upload/image` proxy exists. No markdown library in `package.json`; `prose` classes are used without `@tailwindcss/typography` present.

## Goals / Non-Goals

**Goals:**

- One shared presentational editor + one shared renderer used by blog create/edit, preview, and public view.
- Blog publish replicates projects semantics (Save Draft vs Publish) plus share-on-publish in the same click gesture.
- Published content and preview render formatted, never raw.
- Projects flow works without any markdown; Composer tab removed.

**Non-Goals:**

- Backend changes (no new `posts/upload/image` endpoint in v1; reuse projects upload proxy).
- Rich-text/WYSIWYG editing, collaborative editing, version history, or share-status tracking per network.
- Restyling the public blog beyond formatted markdown + existing `prose` look.

## Decisions

### 1. `react-markdown` + `remark-gfm` + `rehype-sanitize`, no `rehype-raw`

Per current `remarkjs/react-markdown` docs (Context7): render with `<Markdown remarkPlugins={[remarkGfm]}>` for GFM (tables, strikethrough, task lists, autolinks); `react-markdown` is secure by default and `rehype-sanitize` is the recommended safety net when plugins are involved; `rehype-raw` is only for trusted embedded HTML and introduces XSS vectors — so it is excluded. No `rehype-raw`, no custom `urlTransform`.

Alternative considered: `marked` + `dangerouslySetInnerHTML` — rejected (manual sanitization burden, no React component mapping for styling). `uiwjs/react-markdown-preview` — rejected (heavier preview bundle, less control over component mapping).

### 2. Split editor: presentational `MarkdownEditor` + owner-handled actions

Move the editor to `app/admin/shared/components/MarkdownEditor.tsx` with props `value`/`onChange` only; strip `onSave`/`onExecuteDeploy` buttons from the toolbar. Each owner page (`blog/edit`) renders its own Save Draft/Publish bar (mirroring the projects bottom glass bar). This removes the project coupling (`Execute Deploy` label inside blog) and makes the component reusable.

Alternative considered: move file as-is with props renamed — rejected (blog would show "Execute Deploy" semantics and project publish flags).

### 3. New `MarkdownRenderer` shared component

Create `app/admin/shared/components/MarkdownRenderer.tsx` wrapping `react-markdown` with `remarkGfm` + `rehypeSanitize` and a `components` map for styling (headings, links `target=_blank`, code blocks, tables, images `rounded`). Used by public `app/blog/[slug]` and the composer preview. Single mapping guarantees WYSIWYG parity between preview and published page.

### 4. `app/admin/blog/edit` mirrors `projects/edit` structure

New route `app/admin/blog/edit/page.tsx` handling create (`no ?id=`) and edit (`?id=`): title input, image dropzone (same 30MB image/* validation + `uploadImage` reuse), shared `MarkdownEditor`, social toggles (LinkedIn/X checkboxes, same as Composer), live `MarkdownRenderer` preview, bottom status bar. Save Draft → `createPost`/`updatePost` with `published: false`; Publish → same with `published: true`, then `window.open` share URLs only on 2xx, in the same synchronous gesture chain to avoid popup blockers.

### 5. Image via projects upload proxy in v1

`blog/edit` calls the existing `projectService().uploadImage` (`/api/admin/projects/upload/image`) and stores the returned `path` in `Post.image_file`. No new API route, no backend change. Documented as tech debt: a dedicated `posts/upload/image` proxy can replace it without touching the composer UI.

Alternative considered: new `app/api/admin/posts/upload/image` now — rejected (backend support for `posts/upload/image` unconfirmed in this repo).

### 6. Blog list becomes card grid; Composer dies

`app/admin/blog/page.tsx` adopts the `ProjectCard` pattern (image, title, badge, hover edit/view actions) with `PUBLISHED`/`DRAFT` labels (keeping current post wording, not `LIVE`), plus `useMemo` counters and dashed New card. `app/admin/config/page.tsx` loses the Composer tab and its `title/content/platforms/publishing` state; `postService` usage moves to `blog/edit`.

### 7. Projects cleanup is UI-only

Remove editor import/usage and `content` from the payload in `projects/edit`; delete the old component file after the move; simplify `admin/projects/[slug]` to description-only (drop manual markdown parsing). `Project.content` type field stays (legacy, backend-owned) to avoid a breaking type change.

## Risks / Trade-offs

- [Popup blockers] Share `window.open` must run in the click gesture after a successful save; awaiting the POST before opening risks blocking → Mitigation: open only on 2xx and keep the call chain synchronous in the click handler; if blocked, show the share links as fallback buttons.
- [XSS via markdown] Editor content is user HTML-adjacent → Mitigation: no `rehype-raw`, plus `rehype-sanitize`; links forced `rel=noopener`.
- [`prose` styles may not apply] `@tailwindcss/typography` is absent from `package.json` despite `prose` usage → Mitigation: verify at implementation; if missing, either add the plugin or style via the `components` map.
- [Image reuse coupling] Blog images flow through the projects upload endpoint → Mitigation: accepted tech debt, isolated in one service call; replaceable later.
- [Legacy `Project.content`] Old projects retain content that is no longer editable or displayed → Mitigation: leave backend column untouched; note in archive.

## Migration Plan

1. Add deps (`react-markdown`, `remark-gfm`, `rehype-sanitize`); verify build.
2. Create shared `MarkdownEditor` + `MarkdownRenderer`; wire preview in isolation.
3. Build `admin/blog/edit`, revive `admin/blog` buttons, switch list to cards.
4. Strip projects edit of editor/content; simplify project detail; remove Composer tab.
5. Manual QA: draft hidden publicly, publish visible + share windows, preview == public render, image round-trip, 401 → `/auth`.
6. Rollback: revert change (no data migration; old `Project.content` rows untouched, new posts remain valid `posts` rows).

## Open Questions

- None blocking. Follow-up after implementation: confirm with backend owner whether a dedicated `posts/upload/image` endpoint is desired to drop the projects-upload reuse.
