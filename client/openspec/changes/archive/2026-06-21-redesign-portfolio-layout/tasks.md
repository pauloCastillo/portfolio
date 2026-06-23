## 1. Design System Foundation

- [x] 1.1 Add Fira Code Google Font import in layout.tsx (replace Space Grotesk)
- [x] 1.2 Update globals.css: replace color tokens (void, cyan, indigo, surface, muted, border)
- [x] 1.3 Add Tailwind v4 `@theme` directive for all new tokens
- [x] 1.4 Remove unused color variables and light mode media query
- [x] 1.5 Update body background to #0f1117 and text to #f1f5f9
- [x] 1.6 Update siteConfig.ts: rename name to "Kastidev", update social links

## 2. Navbar (SiteNav)

- [x] 2.1 Rewrite Navbar.tsx: sticky positioning with backdrop-blur
- [x] 2.2 Add Kastidev logo with cyan "dev" span, link to "/"
- [x] 2.3 Add navigation links: Stack, Proyectos, Sobre mí, Contacto
- [x] 2.4 Add "Hablemos →" CTA button with cyan border styling
- [x] 2.5 Add responsive behavior: hide nav links on mobile (<700px)

## 3. Shared Components

- [x] 3.1 Create SectionHeading component (eyebrow label + title + optional description)
- [x] 3.2 Create Divider component (styled `<hr>`)
- [x] 3.3 Create Container component (max-w-[1100px] mx-auto px-10)
- [x] 3.4 Create SVG icon components (project, social, value icons)

## 4. Hero Section

- [x] 4.1 Rewrite Heroe.tsx: add eyebrow "Fullstack Developer" with cyan line
- [x] 4.2 Add headline with cyan-accented "cobran vida"
- [x] 4.3 Add subtitle paragraph with muted styling
- [x] 4.4 Add CTA buttons: "Ver proyectos" (primary) and "Trabajemos juntos" (ghost)
- [x] 4.5 Add code snippet component with window dots and syntax-colored spans
- [x] 4.6 Add blinking cursor animation via CSS keyframes

## 5. Stack Section

- [x] 5.1 Rewrite skills section as pill-style tags with SectionHeading
- [x] 5.2 Implement primary vs secondary pill variants (cyan / indigo)
- [x] 5.3 Add hover effects on pills

## 6. Projects Section (ProjectShowcase)

- [x] 6.1 Rewrite ProjectsPage.tsx with new grid layout (2 columns, featured spans 2)
- [x] 6.2 Redesign BaseCard.tsx: icon row, title, description, tags, external link
- [x] 6.3 Add featured card variant with cyan border
- [x] 6.4 Add hover effects on cards

## 7. About Section

- [x] 7.1 Rewrite AboutPage.tsx as two-column grid (avatar card + bio)
- [x] 7.2 Create avatar card: initials circle, name, role, location, stats
- [x] 7.3 Add biography paragraphs with proper styling
- [x] 7.4 Remove download CV button and icon grid skills display

## 8. Values Section

- [x] 8.1 Create ValuesSection component with 3-column grid
- [x] 8.2 Add three value cards (Código limpio, Comunidad primero, Mejora continua)

## 9. Contact Section

- [x] 9.1 Rewrite ContactPage.tsx as centered card (remove form-based layout)
- [x] 9.2 Add "// contacto" label, heading, and description
- [x] 9.3 Add email CTA button (hola@kastidev.dev)
- [x] 9.4 Add social link buttons row (GitHub, LinkedIn, YouTube, TikTok)

## 10. Footer

- [x] 10.1 Rewrite AppFooter.tsx: mono font, brand copyright, tagline
- [x] 10.2 Add top border divider
- [x] 10.3 Add responsive column layout for mobile

## 11. Layout & Responsive

- [x] 11.1 Update page.tsx to include all sections in correct order
- [x] 11.2 Add section dividers between each section
- [x] 11.3 Add responsive breakpoint styles for max-width 700px
- [x] 11.4 Verify all sections render correctly at mobile width

## 12. Cleanup

- [x] 12.1 Remove unused imports and dead code from old components
- [x] 12.2 Remove unused Font Awesome dependencies if icons were replaced
- [x] 12.3 Verify admin/auth routes remain unaffected
- [x] 12.4 Run `npm run build` and fix any errors
