## Context

Current portfolio uses Next.js 16 App Router with Tailwind CSS v4, Redux, and Font Awesome. The frontend consists of 4 sections (Hero, About, Projects, Contact) with a generic light/dark theme, purple accents (#A855F7), Space Grotesk + Inter fonts, and basic styling. The reference design (`kastidev_landing_page.html`) is a fully dark, terminal-inspired portfolio with Fira Code mono font, cyan (#22d3ee) + indigo (#6366f1) accents, and polished component styling.

## Goals / Non-Goals

**Goals:**
- Match the reference design's visual identity across all sections
- Preserve all existing functionality (admin panel, auth, API data fetching, contact form)
- Use Tailwind CSS v4 utilities exclusively (no custom CSS classes beyond globals.css tokens)
- Maintain dark-only theme (remove light mode variants)
- Replace Font Awesome with inline SVGs or tabler-icons for consistency with reference
- All sections must be responsive matching reference breakpoints

**Non-Goals:**
- No changes to backend API, database schemas, or server endpoints
- No changes to admin panel UI or auth flow
- No changes to Redux store structure
- No new external dependencies (use existing Fira Code from Google Fonts)
- No animation libraries — use CSS animations only

## Decisions

### 1. Design Token Architecture
**Decision**: Replace globals.css tokens to match reference palette exactly.
- Background: `#0f1117` (replaces `#030712`)
- Surface: `#1a1f2e`, Surface-2: `#222840`
- Primary: `#22d3ee` (cyan, replaces `#06B6D4`)
- Secondary: `#6366f1` (indigo, replaces `#A855F7`)
- Text: `#f1f5f9`, Muted: `#94a3b8`
- Border: `rgba(255,255,255,0.07)`
- **Rationale**: Exact color match ensures pixel-perfect parity with reference. Storing as CSS custom properties + Tailwind v4 `@theme` directive enables seamless use with Tailwind utility classes.

### 2. Typography Strategy
**Decision**: Add Fira Code from Google Fonts, keep Inter as body font. Remove Space Grotesk.
- Display/Mono: `Fira Code` (weights 400, 500, 600, 700)
- Body: `Inter` (weights 300, 400, 500, 600, 700)
- **Rationale**: Reference uses Fira Code for all code-like elements and nav CTA. Inter remains body font. Space Grotesk isn't in reference — removing it avoids unnecessary font load.

### 3. Component Architecture
**Decision**: Keep existing file structure but rewrite component internals. Use a `SectionHeading` shared component for section labels/titles.
- **SectionHeading**: Reusable component with `// label` eyebrow + h2 title + optional description
- **Divider**: Reusable `<hr>` component with reference styling
- **Container**: Section wrapper with max-width 1100px, centered
- **Rationale**: Reference has consistent section patterns. Extracting reusable components reduces duplication.

### 4. Icon Strategy
**Decision**: Replace Font Awesome with inline SVG components for the 4-5 icons needed (project icons, social icons, value icons).
- Bundle a small set of SVG components in `app/shared/ui/icons/`
- **Rationale**: Reference uses `<i class="ti ti-*">` (Tabler Icons). Adding Tabler Icons as a dep is optional; inline SVGs have zero bundle cost and full control.

### 5. Data Flow
**Decision**: Keep existing data fetching (useProjects hook + projectService) but map API data to component props. No changes to API contracts.
- Projects come from API via existing service
- Skills data hardcoded in component (as it is currently)
- Social links from siteConfig
- **Rationale**: Backend integration is unchanged; only presentation layer changes.

### 6. Code Snippet Hero Element
**Decision**: Implement as a static JSX component with syntax-colored spans (not a real syntax highlighter).
- Use CSS class names for syntax colors: cyan for keywords, green for strings, gray for comments, white for identifiers
- Include window dots (red/yellow/green) and filename tab
- **Rationale**: The reference uses manual span coloring. A real syntax highlighter is unnecessary for a small static snippet.

## Risks / Trade-offs

- **Risk**: Removing Space Grotesk may affect admin panel readability → **Mitigation**: Admin panel uses its own styles; layout.tsx font variables won't affect admin routes
- **Risk**: Projects grid layout may not match reference if API returns few projects → **Mitigation**: Use conditional rendering — featured card only when enough projects, grid adapts
- **Risk**: Replacing Font Awesome with inline SVGs could have icon parity gaps → **Mitigation**: Pre-audit icon set; use Unicode/emoji fallbacks for non-critical icons
- **Trade-off**: Using static code snippet instead of dynamic syntax highlighting means content is hardcoded in JSX — acceptable for a portfolio hero
