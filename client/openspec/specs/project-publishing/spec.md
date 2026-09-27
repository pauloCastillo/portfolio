# project-publishing Specification

## Purpose

Permite que un administrador autenticado cree proyectos desde el panel admin como borrador o publicados, de modo que los publicados aparezcan automáticamente en la sección pública de proyectos de la web.

## Requirements

### Requirement: Server-derived project ownership

The system SHALL assign the `user_id` of a newly created project from the authenticated session (`current_user`) and SHALL ignore any `user_id` value sent by the client.

#### Scenario: Create project without user_id succeeds

- **WHEN** an authenticated admin sends `POST projects/` with title, description and `published` but without `user_id`
- **THEN** the system responds `201` with the created project whose `user_id` equals the authenticated user's id

#### Scenario: Client-sent user_id is ignored

- **WHEN** an authenticated admin sends `POST projects/` including a `user_id` different from their own
- **THEN** the system creates the project owned by the authenticated user, not by the sent `user_id`

#### Scenario: Unauthenticated create is rejected

- **WHEN** a request without valid credentials hits `POST projects/`
- **THEN** the system responds `401` and creates nothing

### Requirement: Draft projects stay out of the public site

The system SHALL persist projects created with `published: false` as drafts that are visible in the admin panel and absent from the public published-projects feed.

#### Scenario: Save Draft flow

- **WHEN** an admin saves a new project with `published: false`
- **THEN** the project appears in the admin list with DRAFT status
- **THEN** the project does NOT appear in `GET projects/published` nor in the web `#proyectos` section

### Requirement: Published projects appear on the public site

The system SHALL include projects created or updated with `published: true` in the public published-projects feed consumed by the web projects section.

#### Scenario: Execute Deploy flow

- **WHEN** an admin deploys a new project with `published: true`
- **THEN** the project appears in the admin list with LIVE status
- **THEN** the project appears in `GET projects/published` and in the web `#proyectos` section

### Requirement: Project creation validates required content

The system SHALL reject project creation when `title` or `description` are empty, responding with a validation error that names the offending field.

#### Scenario: Empty title is rejected with field detail

- **WHEN** an admin submits a new project with an empty title
- **THEN** the system responds with a validation error identifying `title`
- **THEN** no project is created
