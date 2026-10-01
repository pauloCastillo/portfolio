from pathlib import Path

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr

from core.config import Settings


class EmailService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._fastmail: FastMail | None = None

    def _get_fastmail(self) -> FastMail:
        if self._fastmail is None:
            config = ConnectionConfig(
                MAIL_USERNAME=self.settings.mail_username,
                MAIL_PASSWORD=self.settings.mail_password,
                MAIL_FROM=self.settings.mail_from,
                MAIL_FROM_NAME=self.settings.mail_from_name,
                MAIL_PORT=self.settings.mail_port,
                MAIL_SERVER=self.settings.mail_host,
                MAIL_STARTTLS=True,
                MAIL_SSL_TLS=False,
                USE_CREDENTIALS=True,
                VALIDATE_CERTS=True,
            )
            self._fastmail = FastMail(config)
        return self._fastmail

    async def send_password_reset_email(
        self, email: EmailStr, name: str, reset_url: str
    ) -> None:
        template_path = (
            Path(__file__).resolve().parent.parent.parent
            / "templates"
            / "emails"
            / "password_reset.html"
        )

        if not template_path.exists():
            raise FileNotFoundError(
                f"Email template not found at {template_path}"
            )

        html_content = template_path.read_text(encoding="utf-8")
        html_content = html_content.replace("{{ name }}", name)
        html_content = html_content.replace("{{ reset_url }}", reset_url)

        message = MessageSchema(
            subject="Reset your password — Portfolio",
            recipients=[email],
            body=html_content,
            subtype="html",
        )

        fm = self._get_fastmail()
        await fm.send_message(message)
