## ADDED Requirements

### Requirement: Stack section label and title
The stack section SHALL display:
- Section label: "// tecnologías" in Fira Code, 12px, cyan, uppercase, letter-spacing 0.08em
- Section title: "Stack & herramientas" in font-size clamp(1.6rem, 3vw, 2.2rem), font-weight 600
- Section description: "Las tecnologías con las que construyo día a día — desde el frontend hasta el backend y mobile." in 16px, muted color, max-width 500px

#### Scenario: Section heading renders
- **WHEN** the stack section renders
- **THEN** the label, title, and description SHALL appear in order

### Requirement: Skill pill tags
Skills SHALL be displayed as pill-shaped tags (border-radius: 20px) with:
- Background: surface (#1a1f2e), border: 1px solid border color
- Font: Fira Code 13px, muted color (#94a3b8)
- Padding: 6px 16px
- Primary skills (frontend/core): cyan border (rgba 0.25) and cyan text
- Secondary skills (mobile): indigo border (rgba 0.25) and indigo text
- All pills SHALL have hover effect: cyan border + cyan text

#### Scenario: Skill pills render
- **WHEN** the stack section renders
- **THEN** all skills SHALL appear as flex-wrap pill tags
- **AND** primary skills SHALL have cyan styling
- **AND** secondary skills SHALL have indigo styling
