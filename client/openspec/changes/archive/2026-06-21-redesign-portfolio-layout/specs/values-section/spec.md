## ADDED Requirements

### Requirement: Values grid
The values section SHALL display a 3-column grid of value cards with 16px gap. Each card SHALL have:
- Background: surface (#1a1f2e), border: 1px border, border-radius: 12px, padding: 1.5rem
- Icon in 22px cyan color
- Title in 15px font-weight 600, text color
- Description in 13px, muted color, line-height 1.6

#### Scenario: Values grid renders
- **WHEN** the values section renders
- **THEN** three value cards SHALL appear in a 3-column grid

### Requirement: Value card content
The three value cards SHALL contain:
1. "Código limpio" — "No solo que funcione — que sea mantenible, legible y escalable en el tiempo."
2. "Comunidad primero" — "Aprendo en público, comparto lo que descubro y creo que el conocimiento se multiplica al compartirse."
3. "Mejora continua" — "Cada proyecto es una oportunidad de ser mejor developer que el día anterior."

#### Scenario: Value cards content
- **WHEN** value cards render
- **THEN** each card SHALL display its corresponding icon, title, and description
