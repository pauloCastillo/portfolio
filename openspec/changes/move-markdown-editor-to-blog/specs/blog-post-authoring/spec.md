# Spec Delta

## Purpose

Cubre la experiencia de autoría del blog en el panel admin: crear y editar posts con editor markdown, imagen opcional, preview renderizado y publicación con share social, replicando la lógica Save Draft vs Publish de proyectos.

## ADDED Requirements

### Requirement: Admin blog list shows posts as status cards

The system SHALL display admin blog posts as cards in a grid with a `PUBLISHED`/`DRAFT` status badge, live/draft counters, a dashed "New Post" card, and per-card edit and delete actions.

#### Scenario: Published and draft posts show distinct badges

- **WHEN** an admin opens `admin/blog` with at least one published and one draft post
- **THEN** each card shows its title with a `PUBLISHED` badge for published posts and a `DRAFT` badge for drafts

#### Scenario: New Post card navigates to composer

- **WHEN** an admin clicks NEW POST or the dashed "New Post" card
- **THEN** the system navigates to the blog composer for creating a post

#### Scenario: Edit action opens composer with post loaded

- **WHEN** an admin clicks edit on a post card
- **THEN** the system navigates to the blog composer with that post's title, content and image loaded

#### Scenario: Delete removes the post from the list

- **WHEN** an admin confirms deletion of a post
- **THEN** the post is removed and no longer appears in the admin list

### Requirement: Blog composer edits markdown with live rendered preview

The system SHALL provide a blog composer with a title field, a markdown editor toolbar (bold, italic, link, code, image), an optional cover image picker, and a live preview that renders the markdown formatted (never raw).

#### Scenario: Preview renders markdown formatted

- **WHEN** an admin types `**bold**` or `# Heading` in the composer editor
- **THEN** the preview shows bold text and a heading, not the raw markdown characters

#### Scenario: Composer loads existing post for editing

- **WHEN** an admin opens the composer with an existing post id
- **THEN** the title, markdown content and cover image are prefilled from that post

### Requirement: Blog composer saves drafts without sharing

The system SHALL persist a composer save with `published: false` as a draft visible in the admin list with `DRAFT` status, absent from the public feed, without opening any social share window.

#### Scenario: Save Draft stays internal

- **WHEN** an admin saves title, content and optional image with Save Draft
- **THEN** the post appears in the admin list with `DRAFT` status
- **THEN** the post does NOT appear in `GET posts/published`
- **THEN** no social share window is opened

### Requirement: Blog composer publishes and shares to selected networks

The system SHALL persist a composer publish with `published: true` so the post appears with `PUBLISHED` status and in the public feed, and SHALL open a share intent for each selected network (LinkedIn, X) in the same user gesture.

#### Scenario: Publish shares to selected networks

- **WHEN** an admin publishes a post with LinkedIn and X selected
- **THEN** the post is saved with `published: true`
- **THEN** the post appears in the admin list with `PUBLISHED` status and in `GET posts/published`
- **THEN** a share window opens for LinkedIn and one for X with the post title and content

#### Scenario: Publish without networks shares nowhere

- **WHEN** an admin publishes a post with no network selected
- **THEN** the post is saved with `published: true` and appears publicly
- **THEN** no share window is opened

#### Scenario: Failed publish shares nothing

- **WHEN** an admin publishes but the save request fails
- **THEN** no post is created or updated
- **THEN** no share window is opened

### Requirement: Blog composer validates required fields

The system SHALL require a non-empty title and non-empty content before saving or publishing from the composer, and SHALL redirect to login on `401`.

#### Scenario: Empty title blocks save

- **WHEN** an admin tries to save with an empty title
- **THEN** the system shows a validation error and creates or updates nothing

#### Scenario: Empty content blocks publish

- **WHEN** an admin tries to publish with empty content
- **THEN** the system shows a validation error identifying `content` and creates or updates nothing

#### Scenario: Expired session redirects to login

- **WHEN** a save or publish request responds `401`
- **THEN** the system redirects to `/auth`
