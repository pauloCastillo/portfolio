## Context

The portfolio server has authentication via JWT (login, token validation) but no password recovery mechanism. When a user forgets their password, there is currently no way to regain access without database-level intervention.

The server uses Clean Architecture (endpoints -> services -> repositories -> SQLAlchemy models), bcrypt for password hashing, and python-jose for JWT. MySQL via PyMySQL is the database. There is no existing email infrastructure.

This change introduces email sending for the first time, using fastapi-mail (async SMTP via aiosmtplib) and Resend as the email provider.

## Goals / Non-Goals

**Goals:**
- Allow users to request a password reset via email
- Send a secure, time-limited reset link via email
- Allow users to set a new password using a valid token
- Prevent email enumeration (same response regardless of whether email exists)
- Support one-time use tokens (token becomes invalid after successful reset)
- Match email template design to the portfolio\'s existing cyber/tech dark theme

**Non-Goals:**
- Email verification on registration (separate feature)
- Rate limiting (no existing infrastructure -- deferred)
- Password reset confirmation email (could be added later)
- Frontend pages (in-scope for client, not server)
- Multi-token support per user (one active token at a time)

## Decisions

### Decision 1: Reset Token -- DB-backed SHA-256 hash

**Choice:** Store ``secrets.token_urlsafe(32)`` hashed with SHA-256 in a new ``reset_token_hash`` column on the ``User`` model, alongside a ``reset_token_expires_at`` timestamp.

**Why not JWT-only?** JWT-only is simpler (no DB changes) but provides no revocation -- a leaked token is valid until expiry. The DB-backed approach allows us to:
- Enforce one-time use (clear hash after successful reset)
- Explicitly invalidate tokens
- Detect replay attempts (hash no longer exists in DB)

**Why hash the token?** Defense in depth. If the DB is compromised, hashed tokens cannot be used to reset passwords. The raw token is only in the email link and in memory during the request.

### Decision 2: Email Library -- fastapi-mail

**Choice:** Use ``fastapi-mail`` with ``BackgroundTasks`` for async email dispatch.

**Why?** It\'s async-native (aiosmtplib), integrates naturally with FastAPI\'s dependency injection and BackgroundTasks, handles connection pooling, and supports HTML emails with minimal boilerplate. The user explicitly requested it.

### Decision 3: Email Provider -- Resend

**Choice:** Use Resend\'s SMTP (``smtp.resend.com:587`` with STARTTLS).

**Why?** Best developer experience among transactional email services -- straightforward setup, generous free tier (100 emails/day), SMTP credentials via API key, good deliverability.

### Decision 4: Token Expiry -- 15 minutes

**Choice:** Reset tokens expire 15 minutes after generation.

**Why?** Short enough to limit abuse window if link is intercepted. Long enough for the user to check email and click the link.

### Decision 5: Enumeration Prevention -- Always Return 200

**Choice:** The forgot-password endpoint always returns ``{"message": "If an account exists with this email, a reset link has been sent."}`` regardless of whether the email exists.

**Why?** Standard security practice. Revealing whether an email is registered enables account enumeration attacks.

### Decision 6: Email Template -- No Template Engine

**Choice:** Use Python f-strings to render the HTML email template, read from ``templates/emails/password_reset.html``.

**Why?** Single email template, no additional dependency (Jinja2). The template file is static HTML with ``{{ name }}`` and ``{{ reset_url }}`` placeholders, substituted at send time.

### Decision 7: Architecture -- Email as Service Layer

**Choice:** Create ``EmailService`` as a standalone service class (not inheriting from ``BaseService``) with an async ``send_password_reset_email()`` method.

**Why?** Email is not a CRUD resource, so ``BaseService[T]`` doesn\'t fit. A standalone service with clear interface keeps the email infrastructure isolated and testable.

## Architecture

### Data Flow

```
Client                        Server
  |                              |
  |  POST /forgot-password       |
  |  { "email": "..." }          |
  | ------------------------------->|
  |                              |  validate email format
  |                              |  look up user by email
  |                              |  +- if found + active:
  |                              |  |  token = secrets.token_urlsafe(32)
  |                              |  |  hash = SHA256(token)
  |                              |  |  store hash + expires_at on User
  |                              |  |  queue BackgroundTask send_email
  |                              |  +- else: silently no-op
  |  200 { "message": "..." }    |
  | <-------------------------------|
  |                              |  [background] send email via fastapi-mail
  |                              |
  |  [email with reset link]     |
  | <-------------------------------|
  |                              |
  |  POST /reset-password        |
  |  { "token": "...",           |
  |    "new_password": "..." }   |
  | ------------------------------->|
  |                              |  hash token with SHA256
  |                              |  find user by reset_token_hash
  |                              |  check reset_token_expires_at
  |                              |  hash new password (bcrypt)
  |                              |  update user.password
  |                              |  clear reset_token_hash + expires_at
  |  200 { "message": "..." }    |
  | <-------------------------------|
```

### Token Lifecycle

```
                 GENERATION
  token_raw -------------------> email link
       |
       v SHA256
  token_hash ------------------> DB (user.reset_token_hash)
                                  |
                                  |  VERIFICATION
                                  +----> hash incoming token - match DB
                                  |      check expires_at
                                  |      if valid -> reset password
                                  |               -> clear hash + expires_at
                                  |
                                  |  EXPIRY
                                  +----> 15 minutes after creation
                                        (checked at verification time)
```

### Module Dependencies

```
POST /forgot-password
  |
  +- validates: ForgotPasswordRequest (EmailStr)
  +- UserService.initiate_password_reset(db, email)
  |   +- UserRepository.get_by_email()
  |   +- secrets.token_urlsafe(32)
  |   +- hashlib.sha256()
  |   +- UserRepository.update()  -- set hash + expires
  +- BackgroundTasks.add_task(EmailService.send_password_reset_email)
      +- read template from templates/emails/password_reset.html
      +- f-string substitution: {{ name }}, {{ reset_url }}
      +- FastMail(ConnectionConfig).send_message(MessageSchema)

POST /reset-password
  |
  +- validates: ResetPasswordRequest (token + new_password)
  +- UserService.reset_password(db, token, new_password)
      +- hashlib.sha256(token) -> token_hash
      +- UserRepository.get_by_reset_token_hash(db, token_hash)
      |   +- query: WHERE reset_token_hash = :hash
      |            AND reset_token_expires_at > NOW()
      +- get_password_hash(new_password)  -- bcrypt
      +- UserRepository.update()  -- set password, clear hash + expires
```

### Database Changes

```sql
-- New columns on "user" table
ALTER TABLE user ADD COLUMN reset_token_hash VARCHAR(128) NULL;
ALTER TABLE user ADD COLUMN reset_token_expires_at DATETIME NULL;
```

Index: ``IX_user_reset_token_hash`` on ``reset_token_hash`` (used in lookup).

## Risks / Trade-offs

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Email deliverability (dev/test) | Medium | Low -- emails go to spam | Use Resend\'s test domain with email preview during dev |
| SMTP credentials leaked | Low | High -- attacker could send phishing | Store in .env.local (gitignored), use short-lived API keys |
| Token collision | Very Low | Medium -- two users get same token | 32 bytes of randomness = 2^256 space. Collision risk is negligible |
| Background task fails silently | Low | Medium -- user doesn\'t get email | Add basic error logging in email service |
| Token replayed after reset | Low | High -- prevents actual reset | Hash is cleared on reset, lookup returns no match |
| No rate limiting on endpoint | Medium | Medium -- repeated requests flood email | Deferred -- will spike when frontend is ready |

## Open Questions

- Should we send a confirmation email after successful password reset? (Deferred -- can add later)
- Should we add a separate ``password_reset_tokens`` table instead of User columns? (Current approach is simpler for single-token-per-user, but a separate table would support audit history.)
