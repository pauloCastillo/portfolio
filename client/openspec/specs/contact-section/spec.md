## ADDED Requirements

### Requirement: Contact card
The contact section SHALL display a centered card with:
- Background: surface (#1a1f2e), border: 1px border, border-radius: 16px, padding: 3.5rem
- Section label: "// contacto" in Fira Code 12px cyan, uppercase
- Heading: "¿Tienes un proyecto en mente?" in 2rem font-weight 600
- Description paragraph: "Ya sea freelance, colaboración o simplemente charlar de tech — escríbeme y hablamos." in muted color, max-width 420px, centered
- Email CTA button: `hola@kastidev.dev` as a filled cyan button (same as hero primary CTA)
- All content SHALL be centered (text-align: center)

#### Scenario: Contact card renders
- **WHEN** the contact section renders
- **THEN** a centered card with label, heading, description, and email CTA SHALL appear

### Requirement: Social links
Below the email CTA, the contact section SHALL display social link buttons in a flex-wrap row with 16px gap:
- GitHub, LinkedIn, YouTube, TikTok
- Each link: Fira Code 13px, muted color, 1px border, 10px 20px padding, border-radius 8px
- Hover: cyan text, cyan border (0.4 opacity)
- Social links SHALL be wrapped in `<a>` tags with proper href attributes

#### Scenario: Social links render
- **WHEN** the contact section renders
- **THEN** four social link buttons SHALL appear below the email CTA
- **AND** each SHALL link to the correct external URL
