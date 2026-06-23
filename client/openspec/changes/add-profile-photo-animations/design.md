## Context

The portfolio was recently redesigned with a dark terminal-inspired theme. The About section currently shows a "PC" initials avatar instead of the actual profile photo. The site has no entrance animations — sections appear immediately on page load, which feels static by 2026 UX standards.

## Goals / Non-Goals

**Goals:**
- Replace initials avatar with Next.js `<Image>` component for profile photo
- Install `motion` (framer-motion successor) for React animations
- Create reusable `AnimatedSection` wrapper for scroll-triggered reveals
- Add staggered entrance animations to all sections
- Add hover lift effects on cards
- Keep animations subtle and performant (GPU-accelerated, no layout thrashing)

**Non-Goals:**
- No page transitions or route animations
- No loading skeleton animations
- No parallax or heavy 3D effects
- No changes to admin panel or auth pages

## Decisions

### 1. Animation Library: `motion`
**Decision**: Use `motion` (npm package `motion`, formerly framer-motion v11+).
- `motion` is the current name for framer-motion maintained by the same team
- Provides `motion.div` with `whileInView`, `initial`, `animate`, and `variants` APIs
- Zero-config scroll-triggered animations via `whileInView`
- Tree-shakeable, ~15KB gzipped
- **Alternative considered**: CSS `@keyframes` + intersection observer — more boilerplate, less composable

### 2. Animation Pattern: Reusable `AnimatedSection` Wrapper
**Decision**: Create a single `AnimatedSection` component wrapping `motion.div` with:
- `initial={{ opacity: 0, y: 30 }}` — start invisible, offset down
- `whileInView={{ opacity: 1, y: 0 }}` — animate in when in viewport
- `viewport={{ once: true, margin: "-100px" }}` — animate once, trigger slightly early
- `transition={{ duration: 0.5, ease: "easeOut" }}` — smooth entrance
- Configurable via props: stagger children, custom duration, custom offset

### 3. Stagger Strategy
**Decision**: Use `variants` with `staggerChildren` for lists:
- Parent container sets `staggerChildren: 0.08` (80ms between each child)
- Each child fades in + slides up independently
- Applied to: stack pills, project cards, value cards

### 4. Hero Animation
**Decision**: Animate hero sub-elements sequentially (no stagger container needed):
- Eyebrow: fade in from left (`x: -20`)
- Headline: fade in + slide up
- Subtitle: delayed 0.15s
- CTA buttons: delayed 0.3s
- Code snippet: delayed 0.45s, fade in + scale (0.95 → 1)

### 5. Profile Photo Implementation
**Decision**: Use Next.js `<Image>` with `fill` + `object-fit: cover` inside the circular container.
- `width` and `height` set to 100 (matching the avatar circle dimensions)
- `className="rounded-full object-cover"` for circular crop
- `priority` prop for above-the-fold loading
- **Alternative considered**: CSS `background-image` — loses Next.js image optimization

## Risks / Trade-offs

- **Risk**: `motion` adds ~15KB to bundle → **Mitigation**: Only used on landing page, code-split naturally via page routing
- **Risk**: Animations on slow devices may jank → **Mitigation**: Use `will-change: transform, opacity`, keep to transform/opacity only (GPU-composited)
- **Risk**: Photo file may be large → **Mitigation**: Next.js `<Image>` auto-optimizes to WebP/AVIF with responsive sizes
