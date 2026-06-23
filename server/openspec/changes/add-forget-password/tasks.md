## 1. Dependencies & Config

- [x] 1.1 Add `fastapi-mail` to `requirements-dev.txt`
- [x] 1.2 Add mail settings to `app/core/config.py` (MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM, MAIL_FROM_NAME, FRONTEND_URL, RESET_TOKEN_EXPIRE_MINUTES)
- [x] 1.3 Add mail env vars to `.env.local`

## 2. Database — User Model

- [x] 2.1 Add `reset_token_hash` column (VARCHAR 128, nullable) to `app/db/models/users.py`
- [x] 2.2 Add `reset_token_expires_at` column (DateTime with timezone, nullable) to `app/db/models/users.py`
- [x] 2.3 Run ALTER TABLE migration on MySQL (add columns + index)

## 3. Repository Layer

- [x] 3.1 Add `get_by_reset_token_hash()` method to `app/repositories/user_repo.py` (query by hash + expiry check)

## 4. Schemas

- [x] 4.1 Add `ForgotPasswordRequest` schema (email: EmailStr) to `app/db/schemas/user_dto.py`
- [x] 4.2 Add `ResetPasswordRequest` schema (token: str, new_password: str with 8-20 validation) to `app/db/schemas/user_dto.py`

## 5. Email Service

- [x] 5.1 Create `app/services/email_service.py` with `EmailService` class wrapping `fastapi-mail` FastMail
- [x] 5.2 Add `send_password_reset_email()` async method (reads template, substitutes vars, sends)
- [x] 5.3 Create `templates/emails/` directory
- [x] 5.4 Create `templates/emails/password_reset.html` — dark theme email matching portfolio\'s cyber/tech design

## 6. User Service — Business Logic

- [x] 6.1 Add `initiate_password_reset()` method to `app/services/user_service.py` (generates token, stores hash, returns user info)
- [x] 6.2 Add `reset_password()` method to `app/services/user_service.py` (hashes token, validates, updates password, clears fields)

## 7. Dependencies

- [x] 7.1 Add `get_email_service()` factory to `app/core/dependencies.py` (initializes fastapi-mail ConnectionConfig)

## 8. Endpoints

- [x] 8.1 Add `POST /api/v1/auth/forgot-password` to `app/api/v1/endpoints/auth.py` (validates email, calls service, queues email via BackgroundTasks)
- [x] 8.2 Add `POST /api/v1/auth/reset-password` to `app/api/v1/endpoints/auth.py` (validates token + password, calls service, returns result)

## 9. Email Template

- [x] 9.1 Build HTML email with dark background (#030712), glass card, cyan-purple gradient CTA, Space Grotesk/Inter fonts
- [x] 9.2 Add responsive layout and dark/light mode via prefers-color-scheme
- [x] 9.3 Verify template renders correctly with test substitutions

## 10. Verification

- [ ] 10.1 Test forgot-password with valid email (200, token stored in DB)
- [ ] 10.2 Test forgot-password with unknown email (200, same message, no DB change)
- [ ] 10.3 Test forgot-password with inactive user (200, same message, no DB change)
- [ ] 10.4 Test forgot-password with invalid email format (422)
- [ ] 10.5 Test reset-password with valid token (200, password updated, fields cleared)
- [ ] 10.6 Test reset-password with expired token (400)
- [ ] 10.7 Test reset-password with already-used token (400)
- [ ] 10.8 Test reset-password with weak password (422)
- [ ] 10.9 Test login still works after password reset
- [ ] 10.10 Test token validation (/validate) unaffected
