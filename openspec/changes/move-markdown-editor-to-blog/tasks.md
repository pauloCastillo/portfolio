# Tasks

## 1. Dependencies and shared markdown renderer

- [x] 1.1 Add `react-markdown`, `remark-gfm`, `rehype-sanitize` to `package.json` and verify `npm install` succeeds and `npm run build` still passes
- [x] 1.2 Create shared `MarkdownRenderer` (`value`-in, formatted-out with GFM + sanitize + styled component map) and verify bold/heading/link/table/code/image render formatted in a scratch page, never raw
- [x] 1.3 Verify `prose` styling applies (or add `@tailwindcss/typography` / component-map styles) and verify headings, links, code blocks and images look like a normal blog in the scratch page

## 2. Shared presentational editor

- [x] 2.1 Move `MarkdownEditor` to `app/admin/shared/components/` stripped to `value`/`onChange` (toolbar + line count only, no Save/Deploy buttons) and verify it compiles with no references to project publish logic
- [x] 2.2 Add unit coverage for toolbar insertions (bold/italic/link/image/code) around selection or placeholder and verify `npm test` passes for the new suite

## 3. Blog composer (create + edit)

- [x] 3.1 Scaffold `app/admin/blog/edit/page.tsx` (create without `?id=`, edit with `?id=`) with title field, image dropzone (shared validation, 30MB image/*), shared editor, LinkedIn/X toggles and live `MarkdownRenderer` preview, and verify the page renders empty for create and prefilled for `?id=`
- [x] 3.2 Implement Save Draft (`published: false`, no share windows, navigate to `/admin/blog`) with required-field validation and `401` → `/auth`, and verify a draft appears as DRAFT in admin and is absent from `GET posts/published`
- [x] 3.3 Implement Publish (`published: true`, then share intents per selected network in the same gesture, navigate to `/admin/blog`) with failure-shares-nothing behavior, and verify a publish appears as PUBLISHED, in `GET posts/published`, and opens only the selected share windows
- [x] 3.4 Wire cover image through `Post.image_file` via the existing projects upload proxy and verify an uploaded image persists and displays in composer, admin card and public view

## 4. Admin blog list as status cards

- [x] 4.1 Convert `app/admin/blog/page.tsx` to a card grid with `PUBLISHED`/`DRAFT` badges, live/draft counters and dashed New Post card reusing the `ProjectCard` visual language, and verify badges and counters match the posts' `published` flags
- [x] 4.2 Wire NEW POST, dashed card and per-card edit to `admin/blog/edit` (plus keep working delete with confirm) and verify navigation and deletion update the list

## 5. Public and preview rendering parity

- [x] 5.1 Replace the raw `whitespace-pre-wrap` block in `app/blog/[slug]/page.tsx` with `MarkdownRenderer` (plus cover image on top when present) and verify a published markdown post renders formatted with no raw characters
- [x] 5.2 Verify composer preview output matches the public post rendering for the same markdown (spot-check headings, lists, links, code, tables, images)

## 6. Projects cleanup and Composer removal

- [x] 6.1 Remove the editor from `app/admin/projects/edit/page.tsx` (import, state, usage, `content` in payload) leaving metadata + image + links flows intact, and verify create/edit project still saves with `title`/`description` and no `content`
- [x] 6.2 Delete the old `app/admin/projects/edit/components/MarkdownEditor.tsx` after the move and verify no imports reference it (`grep` returns empty) and `npm run lint` passes
- [x] 6.3 Simplify `app/admin/projects/[slug]/page.tsx` to description-only (drop manual `#/##/>` parsing) and verify an existing project detail page renders without raw markdown
- [x] 6.4 Remove the Composer tab from `app/admin/config/page.tsx` (state, `handlePublish`, preview, `postService` usage) leaving config-only UI, and verify the page builds and saves config with no blog references

## 7. Integration checks

- [x] 7.1 Run `npm run lint`, `npm test` and `npm run build` and verify all pass with no new errors
- [x] 7.2 End-to-end spot check (draft → hidden publicly; publish with image + one network → visible, formatted, one share window; edit round-trip; 401 → `/auth`) and verify each observable behavior matches the specs
