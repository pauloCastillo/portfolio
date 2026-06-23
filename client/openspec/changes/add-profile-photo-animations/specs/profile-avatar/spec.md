## ADDED Requirements

### Requirement: Profile photo in avatar card
The about section avatar card SHALL display the actual profile photo instead of text initials. The photo SHALL be rendered using Next.js `<Image>` component with:
- Source: `/assets/imgs/fotoCV.jpg`
- Dimensions: width 100px, height 100px, matching the avatar circle size
- Class: `rounded-full object-cover w-full h-full` for circular crop
- `priority` prop for optimized loading
- The container SHALL remain a 100px circle with 2px cyan border and overflow hidden

#### Scenario: Profile photo renders
- **WHEN** the about section renders
- **THEN** the avatar SHALL display `fotoCV.jpg` as a circular image
- **AND** the initials "PC" SHALL NOT appear

### Requirement: Animated stats counter
The stats in the avatar card ("3+" years, "10+" projects) SHALL animate counting up when scrolled into view using the `motion` library.

#### Scenario: Stats animate on scroll
- **WHEN** the about section scrolls into view
- **THEN** the stat numbers SHALL animate from 0 to their final values over 1 second
- **AND** the "3+" and "10+" labels SHALL fade in simultaneously
