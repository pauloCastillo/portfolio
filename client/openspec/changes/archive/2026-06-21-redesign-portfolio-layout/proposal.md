## Why

The current portfolio has a basic, generic design that doesn't reflect the developer's brand or skill level. A polished, dark-themed portfolio with terminal-inspired aesthetics will better showcase work and create a stronger professional impression. The reference design (`kastidev_landing_page.html`) provides a modern, cohesive visual identity that the current codebase should match.

## What Changes

- Replace the current design system (colors, typography, spacing) to match the reference dark theme with cyan/indigo accents
- Redesign the **Navbar** to be sticky with backdrop blur, Kastidev brand logo, nav links, and CTA button
- Redesign the **Hero** section with eyebrow text, animated tagline, CTA buttons, and a code snippet display
- Redesign **Skills/Stack** as pill-style tags instead of icon grid
- Redesign **Projects** as cards with icons, tags, featured card spanning 2 columns
- Redesign **About** as a two-column layout with avatar card, stats, and biography text
- Add new **Values** section with 3 value cards
- Redesign **Contact** as a centered card with email CTA and social link buttons
- Redesign **Footer** with mono font, copyright, and tagline
- Add section dividers and proper responsive breakpoints
- Update **siteConfig** to reflect new brand name and social links
- Keep admin/auth routes and existing backend integration intact

## Capabilities

### New Capabilities
- `hero-section`: Hero with eyebrow, tagline, CTA buttons, and code snippet display
- `stack-section`: Skill tags displayed as interactive pills with categories (primary/secondary)
- `about-section`: Two-column layout with avatar card, stats counter, and biography
- `values-section`: Three-column value cards grid (clean code, community, continuous improvement)
- `contact-section`: Centered contact card with email CTA and social link buttons
- `design-system`: Shared design tokens (colors, fonts, spacing, borders) aligned with reference
- `responsive-layout`: Mobile-first responsive breakpoints matching reference

### Modified Capabilities
- `project-showcase`: Redesign project cards to match reference layout with featured card spanning 2 columns
- `site-nav`: Navbar rebranded to Kastidev with sticky behavior, backdrop blur, and CTA button
- `site-footer`: Footer redesigned with mono font, brand tagline, and section divider

## Impact

- **Components**: Rewrite Navbar, Heroe, AboutPage, ProjectsPage, ContactPage, AppFooter, BaseCard
- **Styles**: Update globals.css design tokens (colors, fonts, shadows, borders)
- **Config**: Update siteConfig.ts with new brand name "Kastidev" and social links
- **No impact**: Admin routes, auth system, API services, Redux store, proxy middleware
