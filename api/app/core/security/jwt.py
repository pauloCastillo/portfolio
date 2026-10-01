from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from core.config import get_settings

_settings = get_settings()


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=_settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, _settings.secret_key, algorithm=_settings.algorithm)
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, _settings.secret_key, algorithms=[_settings.algorithm])
        return payload
    except JWTError:
        return None