from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv(".env.local")

class Settings(BaseSettings):
    # JWT settings
    secret_key: str = os.getenv("SECRET_KEY")
    algorithm: str = os.getenv("ALGORITHM")
    access_token_expire_minutes: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

    # Email settings (SMTP via Resend)
    mail_host: str = os.getenv("MAIL_HOST")
    mail_port: int = os.getenv("MAIL_PORT")
    mail_username: str = os.getenv("MAIL_USERNAME")
    mail_password: str = os.getenv("MAIL_PASSWORD")
    mail_from: str = os.getenv("MAIL_FROM")
    mail_from_name: str = os.getenv("MAIL_FROM_NAME", "Portfolio")

    # Frontend URL for reset links
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # Reset token config
    reset_token_expire_minutes: int = os.getenv("RESET_TOKEN_EXPIRE_MINUTES", 15)

def get_settings() -> Settings:
    return Settings()