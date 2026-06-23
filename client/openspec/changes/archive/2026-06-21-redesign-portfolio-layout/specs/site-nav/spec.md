## ADDED Requirements

### Requirement: Navbar layout
The navbar SHALL be:
- Sticky at the top of the viewport
- Display flex, align-items center, justify-content space-between
- Padding: 1.25rem 2.5rem
- Bottom border: 1px solid border color
- Background: rgba(15,17,23,0.92) with backdrop-filter: blur(12px)
- z-index: 100

#### Scenario: Navbar renders
- **WHEN** page loads
- **THEN** the navbar SHALL be fixed at the top with blur backdrop

### Requirement: Navbar logo
The logo SHALL display "Kasti" + "dev" (cyan colored) in Fira Code 18px font-weight 700.
It SHALL link to "/" (home).

#### Scenario: Logo renders
- **WHEN** navbar renders
- **THEN** the Kastidev logo SHALL appear on the left with cyan-colored "dev"

### Requirement: Navbar links
The navbar SHALL display a horizontal list of navigation links:
- Stack, Proyectos, Sobre mí, Contacto
- Links SHALL scroll to corresponding sections (#stack, #proyectos, #sobre-mi, #contacto)
- Font: 14px, muted color (#94a3b8), text-decoration: none
- Hover: color changes to cyan (#22d3ee)
- Links container SHALL use flex with 2rem gap

#### Scenario: Nav links render
- **WHEN** navbar renders
- **THEN** four navigation links SHALL appear
- **AND** clicking each SHALL scroll to the correct section

### Requirement: Navbar CTA
The navbar SHALL display a CTA link "Hablemos →" styled as:
- Fira Code 13px, cyan text
- 1px solid cyan border
- Padding: 8px 18px, border-radius: 6px
- Links to "#contacto"
- Hover: cyan background at 0.1 opacity

#### Scenario: CTA renders
- **WHEN** navbar renders
- **THEN** the "Hablemos →" CTA SHALL appear on the right
