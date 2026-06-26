from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel

from db.schemas.user_dto import UserLogin, Token, ForgotPasswordRequest, ResetPasswordRequest
from core.database import get_db
from core.security.password import verify_password
from core.security.jwt import create_access_token, verify_token
from core.dependencies import get_user_service, get_email_service
from core.config import get_settings
from services.user_service import UserService
from services.email_service import EmailService

# Esquema de respuesta para validación
class TokenValidationResponse(BaseModel):
    valid: bool
    user_email: Optional[str] = None

# Security scheme para extracción del token del header
security = HTTPBearer()

router = APIRouter(
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/login", response_model=Token)
def login_for_access_token(
    user_login: UserLogin,
    db: Session = Depends(get_db),
    user_service: UserService = Depends(get_user_service)
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = user_service.get_by_email(db, user_login.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(user_login.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=get_settings().access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password")
async def forgot_password(
    request: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    user_service: UserService = Depends(get_user_service),
    email_service: EmailService = Depends(get_email_service),
):
    """
    Solicitar reseteo de contraseña.

    Envía un email con un enlace de reseteo si el email está registrado.
    Siempre retorna la misma respuesta para prevenir enumeración de usuarios.
    """
    result = user_service.initiate_password_reset(db, request.email)

    if result:
        settings = get_settings()
        reset_url = f"{settings.frontend_url}/auth/reset?token={result.token}"
        background_tasks.add_task(
            email_service.send_password_reset_email,
            email=result.email,
            name=result.username,
            reset_url=reset_url,
        )

    return {
        "message": "If an account exists with this email, a reset link has been sent."
    }


@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
    user_service: UserService = Depends(get_user_service),
):
    """
    Resetear contraseña usando un token válido.
    """
    success = user_service.reset_password(db, request.token, request.new_password)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    return {"message": "Password reset successful"}


@router.post("/validate", response_model=TokenValidationResponse)
def validate_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Valida un token JWT de acceso.

    Args:
        credentials: Token Bearer extraído del header Authorization

    Returns:
        TokenValidationResponse con valid=True si el token es válido
    """
    token = credentials.credentials

    # Verificar el token usando la función existente
    payload = verify_token(token)

    if payload is None:
        return TokenValidationResponse(valid=False)

    # Extraer el email del usuario del payload
    user_email = payload.get("sub")

    return TokenValidationResponse(
        valid=True,
        user_email=user_email
    )