## ADDED Requirements

### Requirement: Hero eyebrow
The hero section SHALL display an eyebrow label "Fullstack Developer" in Fira Code, 13px, cyan color (#22d3ee), with a horizontal cyan line before the text.

#### Scenario: Eyebrow renders
- **WHEN** hero section renders
- **THEN** the text "Fullstack Developer" SHALL appear in mono font, cyan color
- **AND** a cyan horizontal line SHALL precede the text

### Requirement: Hero headline
The hero section SHALL display a bold headline using the text:
"Construyo ideas que cobran vida en código."
The word "cobran vida" SHALL be highlighted with the cyan accent color.
The headline SHALL use clamp(2.8rem, 6vw, 4.5rem) font size, font-weight 600, and -0.02em letter-spacing.
Line breaks SHALL split the text as "Construyo ideas<br>que <accent>cobran vida</accent><br>en código."

#### Scenario: Headline renders
- **WHEN** hero section renders
- **THEN** the headline SHALL use responsive font sizing
- **AND** "cobran vida" SHALL be cyan-colored

### Requirement: Hero subtitle
The hero section SHALL display a subtitle paragraph: "Aplicaciones web elegantes, eficientes y escalables. De la interfaz al servidor — y de vuelta al usuario."
The subtitle SHALL be 18px, muted color (#94a3b8), max-width 520px, line-height 1.65.

#### Scenario: Subtitle renders
- **WHEN** hero section renders
- **THEN** the subtitle paragraph SHALL appear below the headline

### Requirement: Hero CTA buttons
The hero section SHALL display two CTA buttons:
1. "Ver proyectos" — filled cyan button (#22d3ee background, #0f1117 text), Fira Code 14px, 8px border-radius, 13px 28px padding
2. "Trabajemos juntos" — ghost button (1px solid border, white text), same sizing
Both buttons SHALL have hover effects (opacity 0.85 for primary, border-color cyan + text cyan for ghost).

#### Scenario: CTA buttons render
- **WHEN** hero section renders
- **THEN** two action buttons SHALL appear below the subtitle
- **AND** clicking each SHALL scroll to the corresponding section

### Requirement: Code snippet display
The hero section SHALL display a terminal-style code snippet box containing:
- Window control dots (red, yellow, green circles) with filename "kastidev.ts"
- A TypeScript object literal with syntax-colored spans:
  - Keywords (`const`): cyan
  - Identifiers (`kastidev`): white
  - Strings: green (#86efac)
  - Property values (booleans, special chars): muted
  - A blinking cursor animation after the closing brace
- Background: surface (#1a1f2e), border: 1px solid border color, border-radius: 12px
- Padding: 1.5rem 2rem, max-width: 560px
- Line numbers in #3a4060, margin-right: 1.5rem

#### Scenario: Code snippet renders
- **WHEN** hero section renders
- **THEN** a terminal-style code box SHALL appear below the CTA buttons
- **AND** a blinking cursor animation SHALL play after the last line
