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


@lru_cache
def get_settings() -> Settings:
    return Settings()
