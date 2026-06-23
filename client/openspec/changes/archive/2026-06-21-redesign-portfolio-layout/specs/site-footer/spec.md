## ADDED Requirements

### Requirement: Footer layout
The footer SHALL:
- Have a top border: 1px solid border color
- Display flex, justify-content space-between, align-items center
- Padding: 2rem 2.5rem
- Font: Fira Code 12px, muted color (#94a3b8)
- Max-width: 1100px, centered with auto margin
- On mobile (<700px): column direction, centered text, 8px gap

#### Scenario: Footer renders
- **WHEN** page renders
- **THEN** the footer SHALL appear at the bottom with proper styling

### Requirement: Footer content
The footer SHALL display:
- Left: "Kastidev · 2025" with the "dev" part in cyan color (#22d3ee)
- Right: "// Escribo código limpio, construyo ideas reales." in Fira Code

#### Scenario: Footer content renders
- **WHEN** footer renders
- **THEN** brand copyright SHALL appear on the left and tagline on the right
