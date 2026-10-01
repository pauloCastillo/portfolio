from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env.local",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # JWT settings
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # Email settings (SMTP via Resend)
    mail_host: str
    mail_port: int = 587
    mail_username: str
    mail_password: str
    mail_from: str
    mail_from_name: str = "Portfolio"

    # Frontend URL for reset links
    frontend_url: str = "http://localhost:3000"

    # Reset token config
    reset_token_expire_minutes: int = 15

    # Environment / prod hardening
    env: str = "dev"
    extra_cors_origins: str = ""
    allow_localhost_dev: bool = False
    enable_docs: bool | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()


def should_enable_docs(settings: Settings) -> bool:
    """Docs on en dev por defecto, off en prod salvo opt-in explícito."""
    if settings.enable_docs is not None:
        return settings.enable_docs
    return settings.env != "prod"


def _is_local_origin(origin: str) -> bool:
    """True para localhost/127.0.0.1 en cualquier esquema/puerto."""
    host = origin.split("://", 1)[-1].split(":", 1)[0].lower()
    return host in {"localhost", "127.0.0.1"}


def get_cors_origins(settings: Settings) -> list[str]:
    """Allowlist CORS por entorno con opt-in de localhost:3000."""
    origins: list[str] = []
    if settings.frontend_url:
        origins.append(settings.frontend_url.rstrip("/"))
    for raw in settings.extra_cors_origins.split(","):
        origin = raw.strip().rstrip("/")
        if origin:
            origins.append(origin)
    if settings.env == "prod" and not settings.allow_localhost_dev:
        origins = [o for o in origins if not _is_local_origin(o)]
    localhost = "http://localhost:3000"
    if settings.env != "prod" or settings.allow_localhost_dev:
        if localhost not in origins:
            origins.append(localhost)
    # Deduplicar preservando orden
    seen: set[str] = set()
    unique: list[str] = []
    for origin in origins:
        if origin not in seen:
            seen.add(origin)
            unique.append(origin)
    return unique
