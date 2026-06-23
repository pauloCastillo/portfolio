## MODIFIED Requirements

### Requirement: Avatar card
The avatar card SHALL contain:
- Avatar circle (100px x 100px, rounded-full, 2px cyan border, overflow hidden) with profile photo from `/assets/imgs/fotoCV.jpg` rendered via Next.js `<Image>` component
- Name: "Paulo Castillo" in 18px, font-weight 600
- Role: "@kastidev" in Fira Code 13px cyan
- Location: "Bolivia · remoto disponible" in 13px muted, with a map pin icon
- Stats section divided by border-top:
  - "3+" years experience (animated count up on scroll)
  - "10+" projects delivered (animated count up on scroll)
  Each stat has a number (mono font 22px bold white) and label (11px muted)
- Card background: surface (#1a1f2e), border: 1px border, border-radius: 14px, padding: 2.5rem

#### Scenario: Avatar card renders with photo
- **WHEN** the about section renders
- **THEN** the avatar card SHALL display the profile photo, name, role, location, and animated stats
- **AND** initials "PC" SHALL NOT be shown
