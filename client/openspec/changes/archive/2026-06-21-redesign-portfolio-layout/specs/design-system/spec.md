## ADDED Requirements

### Requirement: Color tokens
The system SHALL define the following color tokens as CSS custom properties and Tailwind v4 theme values:
- `--void`: `#0f1117` (page background)
- `--surface`: `#1a1f2e` (card/section surfaces)
- `--surface-2`: `#222840` (avatar circle background)
- `--cyan`: `#22d3ee` (primary accent, links, CTAs)
- `--indigo`: `#6366f1` (secondary accent, project tags)
- `--text`: `#f1f5f9` (primary text)
- `--muted`: `#94a3b8` (secondary/description text)
- `--border`: `rgba(255, 255, 255, 0.07)` (dividers, card borders)
- `--success`: `#22c55e` (code snippet dot)
- `--warning`: `#f59e0b` (code snippet dot)
- `--error`: `#ef4444` (code snippet dot)

#### Scenario: Tokens available as Tailwind utilities
- **WHEN** any component uses `bg-void`, `text-cyan`, `border-surface`, or similar
- **THEN** the value SHALL resolve to the correct hex/rgba value

### Requirement: Typography
The system SHALL use Fira Code as mono font and Inter as body font, loaded from Google Fonts.
- Fira Code weights: 300, 400, 500, 600, 700
- Inter weights: 300, 400, 500, 600, 700
- Space Grotesk SHALL be removed from layout.tsx

#### Scenario: Fonts applied to page
- **WHEN** page renders
- **THEN** body text SHALL use Inter font
- **AND** code/mono elements SHALL use Fira Code font

### Requirement: Section layout
Each section SHALL have max-width of 1100px, centered with auto margin, and horizontal padding of 2.5rem (40px).
Sections SHALL have vertical padding of 5rem (80px) top and bottom.
The hero section SHALL use 7rem (112px) top padding.

#### Scenario: Section spacing
- **WHEN** any section renders
- **THEN** it SHALL be constrained to max-w-[1100px] with mx-auto and px-10

### Requirement: Dividers
Sections SHALL be separated by `<hr>` elements styled as:
- No border on all sides except top
- Top border: 1px solid var(--border)

#### Scenario: Section divider
- **WHEN** two sections are adjacent
- **THEN** an `<hr>` with class `border-t border-border` SHALL separate them
