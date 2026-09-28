# Spec Delta

## MODIFIED Requirements

### Requirement: Published posts appear in the public feed

The system SHALL include posts created or updated with `published: true` in the public published-posts feed, rendering the markdown `content` as formatted text (never raw markdown) and including the cover image when present. Publishing from the admin composer SHALL also trigger a share intent for each selected social network.

#### Scenario: Published post is publicly visible

- **WHEN** an admin creates a post with `published: true`
- **THEN** the post appears in the admin list with PUBLISHED status
- **THEN** the post appears in `GET posts/published`

#### Scenario: Published content renders formatted, not raw

- **WHEN** a published post with markdown (`**bold**`, `# Heading`, `[link](url)`, tables, code) is viewed publicly or in the composer preview
- **THEN** the system renders formatted text (bold, headings, links, tables, code blocks) instead of raw markdown characters

#### Scenario: Publish opens share for selected networks

- **WHEN** an admin publishes with LinkedIn and X selected
- **THEN** the system saves the post with `published: true` and opens a share intent per selected network

## ADDED Requirements

### Requirement: Posts support an optional cover image

The system SHALL accept and persist an optional `image_file` for posts and SHALL display it in the admin cards, the composer, and the public post view when present.

#### Scenario: Post with image shows it publicly

- **WHEN** an admin publishes a post with a cover image
- **THEN** the public post view displays the image

#### Scenario: Post without image still publishes

- **WHEN** an admin publishes a post without a cover image
- **THEN** the post is created with no image and renders without an image block
