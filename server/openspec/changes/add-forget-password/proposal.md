## Why

The portfolio site has authentication (login, JWT token validation) but no way for users to recover access if they forget their password. Adding a secure forgot-password flow closes this gap — users can reset their password via email without admin intervention.

## What Changes

- Add `POST /api/v1/auth/forgot-password` endpoint — accepts email, generates reset token, sends email with reset link
- Add `POST /api/v1/auth/reset-password` endpoint — accepts token + new password, validates and updates
- Add `reset_token_hash` and `reset_token_expires_at` columns to the `User` model
- Add email sending infrastructure (fastapi-mail via Resend SMTP)
- Add `EmailService` for async email dispatch via `BackgroundTasks`
- Add 2026-styled HTML email template matching the portfolio's cyber/tech dark theme
- Update `Settings` with mail configuration and reset token lifetime

## Capabilities

### New Capabilities
- `reset-password`: Token-based password reset flow — forgot-password request, email delivery, token validation, password update. Covers enumeration prevention, token expiry, one-time use via hash-backed tokens.

### Modified Capabilities
- (none — existing auth capabilities are unchanged)

## Impact

- **Models**: `app/db/models/users.py` — 2 new columns
- **Schemas**: `app/db/schemas/user_dto.py` — 2 new Pydantic models
- **Repository**: `app/repositories/user_repo.py` — 1 new query method
- **Service Layer**: `app/services/user_service.py` — 2 new methods; `app/services/email_service.py` — new file
- **Endpoints**: `app/api/v1/endpoints/auth.py` — 2 new routes
- **Config**: `app/core/config.py` — new mail settings; `.env.local` — new variables
- **Dependencies**: `app/core/dependencies.py` — new factory for email service
- **Dependencies file**: `requirements-dev.txt` — add `fastapi-mail`
- **Templates**: `templates/emails/password_reset.html` — new file
