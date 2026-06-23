## ADDED Requirements

### Requirement: Project card grid
Projects SHALL be displayed in a 2-column grid (1fr 1fr) with 20px gap. The featured project card SHALL span both columns (grid-column: span 2).

#### Scenario: Project grid renders
- **WHEN** the projects section renders
- **THEN** projects SHALL appear in a 2-column grid
- **AND** the first/featured project SHALL span both columns

### Requirement: Project card appearance
Each project card SHALL have:
- Background: surface (#1a1f2e), border: 1px border color, border-radius: 14px, padding: 1.75rem
- Hover effect: border color transitions to cyan (0.35 opacity)
- Featured card: cyan border (0.25 opacity) that persists without hover
- Flex column layout with 12px gap

#### Scenario: Project card styling
- **WHEN** a project card renders
- **THEN** it SHALL have surface background with rounded corners
- **AND** hover SHALL change border to cyan

### Requirement: Project card content
Each project card SHALL contain:
- Top row: project icon (28px, cyan color) + external link ("ver proyecto ↗" or "GitHub ↗" in Fira Code 12px muted)
- Title: 17px, font-weight 600, text color
- Description: 14px, muted color, line-height 1.6
- Tags row: flex-wrap row with tags (Fira Code 11px, indigo text, indigo bg at 0.1 opacity, 3px 10px padding, 4px border-radius)

#### Scenario: Project card content renders
- **WHEN** project card renders
- **THEN** icon, link, title, description, and tags SHALL appear in order
