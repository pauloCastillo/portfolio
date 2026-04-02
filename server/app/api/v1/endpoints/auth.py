from datetime import timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.schemas.user_dto import UserLogin, Token
from app.core.database import get_db
from app.core.security.password import verify_password
from app.core.security.jwt import create_access_token, verify_token
from app.core.dependencies import get_user_service
from app.services.user_service import UserService

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
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


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