## ADDED Requirements

### Requirement: About section layout
The about section SHALL use a two-column grid (1fr 1.2fr) with 4rem gap, containing an avatar card on the left and biography text on the right.

#### Scenario: Two-column layout renders
- **WHEN** the about section renders
- **THEN** an avatar card SHALL be on the left and biography text on the right

### Requirement: Avatar card
The avatar card SHALL contain:
- Avatar circle (100px x 100px, rounded-full, surface-2 background, 2px cyan border) with initials "PC" in Fira Code 28px cyan
- Name: "Paulo Castillo" in 18px, font-weight 600
- Role: "@kastidev" in Fira Code 13px cyan
- Location: "Bolivia · remoto disponible" in 13px muted, with a map pin icon
- Stats section divided by border-top:
  - "3+" years experience
  - "10+" projects delivered
  Each stat has a number (mono font 22px bold white) and label (11px muted)
- Card background: surface (#1a1f2e), border: 1px border, border-radius: 14px, padding: 2.5rem

#### Scenario: Avatar card renders
- **WHEN** the about section renders
- **THEN** the avatar card SHALL display initials, name, role, location, and stats

### Requirement: Biography text
The biography SHALL contain three paragraphs about:
1. Journey starting with "Hola Mundo" leading to passion for building UI
2. Fullstack developer with elegant frontend and solid backend focus
3. Open source contributions, community knowledge sharing, and continuous learning
The text SHALL be 16px, muted color (#94a3b8), line-height 1.8. Bold words SHALL use text color (#f1f5f9).

#### Scenario: Biography renders
- **WHEN** the about section renders
- **THEN** three biography paragraphs SHALL appear with proper styling
