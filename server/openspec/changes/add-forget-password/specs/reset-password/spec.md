# ADDED Requirements

## Requirement: User can request password reset

The system SHALL allow an unauthenticated user to request a password reset by providing their registered email address.

### Scenario: Valid email sends reset link

- **WHEN** a user submits POST /api/v1/auth/forgot-password with a valid registered email
- **THEN** the system SHALL generate a cryptographically secure random token (32 bytes, URL-safe base64)
- **THEN** the system SHALL store the SHA-256 hash of the token and an expiry timestamp (15 minutes from now) on the user\'s record
- **THEN** the system SHALL queue an email to the user\'s address with a reset link containing the raw token
- **THEN** the system SHALL return HTTP 200 with ``{"message": "If an account exists with this email, a reset link has been sent."}``

### Scenario: Unknown email returns same response

- **WHEN** a user submits POST /api/v1/auth/forgot-password with an email not registered in the system
- **THEN** the system SHALL NOT generate any token or send any email
- **THEN** the system SHALL return HTTP 200 with the same message as for a valid email

### Scenario: Inactive user does not receive reset link

- **WHEN** a user submits POST /api/v1/auth/forgot-password with the email of a user whose ``isActive`` is false
- **THEN** the system SHALL NOT generate a token or send an email
- **THEN** the system SHALL return HTTP 200 with the standard message

### Scenario: Invalid email format returns validation error

- **WHEN** a user submits POST /api/v1/auth/forgot-password with a malformed email string
- **THEN** the system SHALL return HTTP 422 with a validation error

### Scenario: Consecutive requests refresh the token

- **WHEN** a user requests a password reset twice before using the first token
- **THEN** the system SHALL overwrite the existing ``reset_token_hash`` and ``reset_token_expires_at`` with new values
- **THEN** only the most recent email link SHALL be valid

## Requirement: User can reset password with valid token

The system SHALL allow an unauthenticated user to reset their password using a valid, non-expired reset token.

### Scenario: Valid token resets password

- **WHEN** a user submits POST /api/v1/auth/reset-password with a valid token and a new password (8-20 characters)
- **THEN** the system SHALL hash the token with SHA-256 and find the matching user record
- **THEN** the system SHALL verify the ``reset_token_expires_at`` is in the future
- **THEN** the system SHALL hash the new password with bcrypt and update the user\'s password
- **THEN** the system SHALL clear ``reset_token_hash`` and ``reset_token_expires_at`` to NULL
- **THEN** the system SHALL return HTTP 200 with ``{"message": "Password reset successful"}``

### Scenario: Expired token is rejected

- **WHEN** a user submits POST /api/v1/auth/reset-password with a token whose ``reset_token_expires_at`` is in the past
- **THEN** the system SHALL return HTTP 400 with ``{"detail": "Invalid or expired reset token"}``

### Scenario: Already-used token is rejected

- **WHEN** a user submits POST /api/v1/auth/reset-password with a token that was already used in a previous successful reset
- **THEN** the system SHALL return HTTP 400 with ``{"detail": "Invalid or expired reset token"}``

### Scenario: Invalid token format is rejected

- **WHEN** a user submits POST /api/v1/auth/reset-password with a token that doesn\'t match any stored hash
- **THEN** the system SHALL return HTTP 400 with ``{"detail": "Invalid or expired reset token"}``

### Scenario: Weak password is rejected

- **WHEN** a user submits POST /api/v1/auth/reset-password with a password shorter than 8 characters or longer than 20
- **THEN** the system SHALL return HTTP 422 with a validation error

## Requirement: Reset email matches brand design

The system SHALL send a password reset email that matches the portfolio\'s cyber/tech dark theme.

### Scenario: Email contains reset link

- **WHEN** the system sends a password reset email
- **THEN** the email SHALL have subject "Reset your password -- Portfolio"
- **THEN** the email SHALL contain the user\'s name or username in the greeting
- **THEN** the email SHALL contain a prominent "Reset Password" button/CTA with the full reset URL
- **THEN** the email SHALL state the 15-minute expiry
- **THEN** the email SHALL note that the user can ignore if they didn\'t request the reset

### Scenario: Email uses portfolio theme

- **WHEN** the system sends a password reset email
- **THEN** the email SHALL use dark background (#030712), glass-style card (#111827 with rgba(255,255,255,0.08) border)
- **THEN** the email SHALL use the portfolio\'s cyan-to-purple gradient on the CTA button
- **THEN** the email SHALL use Space Grotesk for headings and Inter for body text
- **THEN** the email SHALL respect prefers-color-scheme for dark/light mode
- **THEN** the email SHALL be mobile-responsive

## Requirement: Existing auth remains unchanged

The system SHALL NOT modify or remove any existing authentication endpoints or behavior.

### Scenario: Login continues to work

- **WHEN** a user submits POST /api/v1/auth/login with valid credentials
- **THEN** the system SHALL return a JWT access token as before

### Scenario: Token validation continues to work

- **WHEN** a user submits POST /api/v1/auth/validate with a valid JWT
- **THEN** the system SHALL return ``{"valid": true}`` as before
