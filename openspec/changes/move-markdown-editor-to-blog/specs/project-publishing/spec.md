# Spec Delta

## MODIFIED Requirements

### Requirement: Project creation validates required content

The system SHALL reject project creation when `title` or `description` are empty, responding with a validation error that names the offending field. The admin project create/edit flow SHALL NOT collect or edit markdown `content`; projects consist of metadata (title, description, tech stack, links) plus cover image only.

#### Scenario: Empty title is rejected with field detail

- **WHEN** an admin submits a new project with an empty title
- **THEN** the system responds with a validation error identifying `title`
- **THEN** no project is created

#### Scenario: Project saved without markdown content

- **WHEN** an admin saves a project with title, description and optional image but no markdown content
- **THEN** the project is created without requiring any `content` value
