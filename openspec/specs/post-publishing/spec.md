# post-publishing Specification

## Purpose

Permite que un administrador autenticado cree posts del blog como borrador o publicados, con la autoría asignada por el servidor desde la sesión en lugar de exigirla al cliente.

## Requirements

### Requirement: Server-derived post authorship

The system SHALL assign the `author_id` of a newly created post from the authenticated session (`current_user`) and SHALL ignore any `author_id` value sent by the client.

#### Scenario: Create post without author_id succeeds

- **WHEN** an authenticated admin sends `POST posts/` with title, content and `published` but without `author_id`
- **THEN** the system responds `201` with the created post whose `author_id` equals the authenticated user's id

#### Scenario: Client-sent author_id is ignored

- **WHEN** an authenticated admin sends `POST posts/` including an `author_id` different from their own
- **THEN** the system creates the post authored by the authenticated user, not by the sent `author_id`

#### Scenario: Unauthenticated create is rejected

- **WHEN** a request without valid credentials hits `POST posts/`
- **THEN** the system responds `401` and creates nothing

### Requirement: Draft posts stay out of the public feed

The system SHALL persist posts created with `published: false` as drafts that are visible in the admin panel and absent from the public published-posts feed.

#### Scenario: Draft post is hidden publicly

- **WHEN** an admin creates a post with `published: false`
- **THEN** the post appears in the admin list with DRAFT status
- **THEN** the post does NOT appear in `GET posts/published`

### Requirement: Published posts appear in the public feed

The system SHALL include posts created or updated with `published: true` in the public published-posts feed.

#### Scenario: Published post is publicly visible

- **WHEN** an admin creates a post with `published: true`
- **THEN** the post appears in the admin list with PUBLISHED status
- **THEN** the post appears in `GET posts/published`

### Requirement: Post creation validates required content

The system SHALL reject post creation when `title` or `content` are empty, responding with a validation error that names the offending field.

#### Scenario: Empty content is rejected with field detail

- **WHEN** an admin submits a new post with empty content
- **THEN** the system responds with a validation error identifying `content`
- **THEN** no post is created
