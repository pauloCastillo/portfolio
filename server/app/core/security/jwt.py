from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from core.config import get_settings
from db.models.users import User

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Crea un token de acceso JWT.
    
    Args:
        data: Datos a codificar en el token
        expires_delta: Tiempo de expiración (opcional)
        
    Returns:
        Token JWT codificado
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=get_settings().access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, get_settings().secret_key, algorithm=get_settings().algorithm)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """
    Verifica y decodifica un token JWT.
    
    Args:
        token: Token JWT a verificar
        
    Returns:
        Diccionario con los datos del token si es válido, None en caso contrario
    """
    try:
        payload = jwt.decode(token, get_settings().secret_key, algorithms=[get_settings().algorithm])
        return payload
    except JWTError:
        return None