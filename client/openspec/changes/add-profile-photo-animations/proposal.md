## Why

The portfolio site has a generic initials avatar ("PC") instead of the actual profile photo, making the about section feel impersonal. Adding modern scroll-triggered animations with staggered entrance effects will bring the site to current 2026 UX standards, improve visual polish, and create a more engaging experience.

## What Changes

- Replace the "PC" initials avatar circle in the About section with the actual profile photo (`fotoCV.jpg`) using Next.js `<Image>`
- Install the `motion` library (formerly framer-motion) for declarative React animations
- Create a reusable `AnimatedSection` component for scroll-reveal entrance animations
- Add staggered entrance animations to: Hero elements, Stack pills, Project cards, Value cards, Contact section
- Add hover lift effects on project cards and value cards
- Add animated stats counter in the About avatar card (animate "3+" and "10+" into view)

## Capabilities

### New Capabilities
- `profile-avatar`: Profile photo display in the about section avatar card
- `scroll-animations`: Scroll-triggered entrance animations with staggered children

### Modified Capabilities
- `about-section`: Avatar card requirement changes from text initials to actual photo via Next.js Image

## Impact

- **New dependency**: Add `motion` to package.json
- **New components**: `AnimatedSection.tsx` scroll-reveal wrapper
- **Modified components**: AboutPage, Heroe, StackSection, ProjectsPage, BaseCard, ValuesSection, ContactPage
- **No impact**: Admin routes, auth, API services, Redux store, globals.css
