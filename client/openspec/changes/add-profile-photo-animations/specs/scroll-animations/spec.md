## ADDED Requirements

### Requirement: Scroll-triggered section entrance
Each page section SHALL animate into view when scrolled into the viewport using a reusable `AnimatedSection` wrapper component. The animations SHALL:
- Start with opacity 0 and translateY(30px) offset
- Animate to opacity 1 and translateY(0)
- Duration: 0.5 seconds with easeOut easing
- Trigger once per page load (no re-animation on scroll away and back)
- Trigger slightly before the element enters the viewport (margin: -100px)

#### Scenario: Section fades in on scroll
- **WHEN** a user scrolls to a new section
- **THEN** the section SHALL fade in and slide up from 30px below

### Requirement: Staggered child animation
Parent containers with multiple children (stack pills, project cards, value cards) SHALL use `motion` variants with `staggerChildren: 0.08` so each child appears sequentially with 80ms delay between them.

#### Scenario: Staggered entrance
- **WHEN** a grid or flex container with animated children enters viewport
- **THEN** each child SHALL appear one by one with 80ms stagger delay

### Requirement: Hero sequential animation
The hero section sub-elements SHALL animate in sequence:
1. Eyebrow: slides in from left (`x: -20` → `x: 0`)
2. Headline: fades in + slides up
3. Subtitle: fades in (0.15s delay)
4. CTA buttons: fades in (0.3s delay)
5. Code snippet: fades in + slight scale (0.3s delay, 0.95 → 1 scale)

#### Scenario: Hero elements animate sequentially
- **WHEN** the hero section loads
- **THEN** elements SHALL appear in the specified sequence with increasing delays

### Requirement: Card hover animation
Project cards and value cards SHALL have a hover effect using `motion` `whileHover`:
- Lift up by `y: -4` pixels
- Smooth transition 0.2s

#### Scenario: Card lifts on hover
- **WHEN** user hovers over a card
- **THEN** the card SHALL lift by 4px with smooth transition
