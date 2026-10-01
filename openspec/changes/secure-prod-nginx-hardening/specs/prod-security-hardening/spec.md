# prod-security-hardening Specification

## Purpose

Endurecer la superficie de producción del backend en Render (tier gratuito) con CORS por entorno, docs desactivables, rate-limits en auth, límites de tamaño diferenciados, headers de seguridad y validación estricta de uploads de imagen.

## ADDED Requirements

### Requirement: Environment-scoped CORS with localhost opt-in

The system SHALL allow cross-origin requests only from an explicit allowlist built from environment configuration, and SHALL support an opt-in to also allow `http://localhost:3000` for local development against a remote backend.

#### Scenario: Production allows only configured web origins

- **WHEN** `ENV` is `prod` and a browser sends `Origin: https://<frontend-prod>` included in the allowlist
- **THEN** the system responds with `Access-Control-Allow-Origin` matching that origin

#### Scenario: Unlisted origin is rejected

- **WHEN** a browser sends an `Origin` not present in the allowlist
- **THEN** the system does NOT return `Access-Control-Allow-Origin` for that origin

#### Scenario: Localhost opt-in enables local dev

- **WHEN** the localhost opt-in flag is enabled and a request arrives with `Origin: http://localhost:3000`
- **THEN** the system allows it as a valid CORS origin

#### Scenario: Localhost is denied in prod without opt-in

- **WHEN** the localhost opt-in flag is disabled and a request arrives with `Origin: http://localhost:3000`
- **THEN** the system does NOT allow that origin

### Requirement: API docs disabled in production

The system SHALL NOT expose interactive API documentation (`/api/docs`, `/api/redoc`) when docs are disabled for production.

#### Scenario: Docs return not-found in prod

- **WHEN** docs are disabled and a client requests `GET /api/docs`
- **THEN** the system responds `404` and exposes no schema

#### Scenario: Docs remain available in development

- **WHEN** docs are enabled and a client requests `GET /api/docs`
- **THEN** the system serves the interactive documentation

### Requirement: Auth endpoints are rate-limited

The system SHALL rate-limit authentication endpoints so brute-force and email-bombing attempts receive `429 Too Many Requests` with a `Retry-After` hint instead of reaching business logic.

#### Scenario: Login brute force is throttled

- **WHEN** a single client exceeds 5 `POST /api/v1/auth/login` attempts within one minute
- **THEN** the system responds `429` with `Retry-After` and does NOT verify credentials for the excess requests

#### Scenario: Password-reset requests are throttled

- **WHEN** a single client exceeds 3 `POST /api/v1/auth/forgot-password` attempts within one hour
- **THEN** the system responds `429` and does NOT enqueue additional reset emails

#### Scenario: Normal auth traffic passes

- **WHEN** a client stays below the configured limits on auth endpoints
- **THEN** the system processes the requests normally with `200/201/400/401` as appropriate

### Requirement: Request size limits are enforced per route

The system SHALL reject oversized request bodies with `413`, applying a strict 1MB default and a 31MB allowance only on the image-upload route.

#### Scenario: Oversized JSON is rejected

- **WHEN** a client sends a non-upload request with a body larger than 1MB
- **THEN** the system responds `413` before business logic runs

#### Scenario: Oversized image is rejected

- **WHEN** a client uploads an image larger than 30MB to `POST /api/v1/projects/upload/image`
- **THEN** the system responds `400` or `413` and stores nothing

#### Scenario: Image within limit is accepted

- **WHEN** an authenticated admin uploads a valid image of 5MB
- **THEN** the system processes the upload normally

### Requirement: Security headers on backend responses

The system SHALL include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or equivalent `frame-ancestors`), and a restrictive `Referrer-Policy` on backend responses.

#### Scenario: Headers present on API response

- **WHEN** a client calls any `/api/v1/*` endpoint
- **THEN** the response includes `X-Content-Type-Options: nosniff` and a framing denial

### Requirement: Strict image-upload validation

The system SHALL accept only `png`, `jpeg`, `jpg` and `webp` images, SHALL reject `image/svg+xml`, SHALL verify actual file content (not only the client-sent MIME), SHALL measure size from bytes read (never from client metadata), and SHALL store uploads under an unguessable random filename.

#### Scenario: SVG upload is rejected

- **WHEN** an authenticated admin uploads a file with content type `image/svg+xml`
- **THEN** the system responds `400` with an invalid-type error and stores nothing

#### Scenario: Spoofed MIME is rejected

- **WHEN** a client uploads non-image bytes labeled as `image/png`
- **THEN** the system responds `400` and stores nothing

#### Scenario: Size is measured from actual bytes

- **WHEN** a client uploads a 40MB file whose metadata omits or understates its size
- **THEN** the system still rejects it for exceeding the limit

#### Scenario: Stored filename is unguessable

- **WHEN** an upload succeeds
- **THEN** the returned path uses a random token filename preserving only a safe image extension, not the client-supplied basename
