## ADDED Requirements

### Requirement: Mobile breakpoint (max-width 700px)
At viewport widths 700px and below, the layout SHALL adapt:
- Navbar: Reduce padding to 1rem 1.25rem, hide nav links
- Sections: Reduce padding to 3.5rem 1.25rem
- Hero: Reduce top/bottom padding to 4rem
- Projects grid: Change to single column (1fr), featured card loses span-2
- About grid: Change to single column (1fr)
- Values grid: Change to single column (1fr)
- Contact wrap: Reduce padding to 2rem 1.25rem
- Footer: Change to column direction, center-align text

#### Scenario: Mobile layout
- **WHEN** viewport width is 700px or less
- **THEN** all sections SHALL adapt according to the mobile breakpoint rules
- **AND** nav links SHALL be hidden

### Requirement: Section heading consistency
All section labels SHALL use Fira Code 12px, cyan, uppercase, letter-spacing 0.08em, with margin-bottom 0.75rem.
All section titles SHALL use clamp(1.6rem, 3vw, 2.2rem), font-weight 600, -0.01em letter-spacing, margin-bottom 1rem.

#### Scenario: Section headings consistent
- **WHEN** any page section heading renders
- **THEN** the label and title SHALL follow consistent sizing rules
