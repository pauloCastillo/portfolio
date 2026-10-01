"""Task 1.1: CORS por entorno + docs flag (marca: unit)."""

import pytest

from core.config import Settings, get_cors_origins, should_enable_docs


def _settings(**kwargs) -> Settings:
    base = {
        "secret_key": "test-secret-key-for-testing",
        "mail_host": "smtp.test.local",
        "mail_username": "u",
        "mail_password": "p",
        "mail_from": "test@test.local",
    }
    base.update(kwargs)
    return Settings(**base)


@pytest.mark.unit
def test_prod_closes_localhost_without_opt_in():
    s = _settings(env="prod", frontend_url="https://web.example.com")
    origins = get_cors_origins(s)
    assert "https://web.example.com" in origins
    assert "http://localhost:3000" not in origins
    assert "http://localhost:3306" not in origins


@pytest.mark.unit
def test_prod_opens_localhost_with_opt_in():
    s = _settings(
        env="prod",
        frontend_url="https://web.example.com",
        allow_localhost_dev=True,
    )
    assert "http://localhost:3000" in get_cors_origins(s)


@pytest.mark.unit
def test_dev_allows_localhost_by_default():
    s = _settings(env="dev", frontend_url="https://web.example.com")
    assert "http://localhost:3000" in get_cors_origins(s)


@pytest.mark.unit
def test_extra_origins_are_split_and_deduped():
    s = _settings(
        env="prod",
        frontend_url="https://web.example.com/",
        extra_cors_origins="https://a.example.com, https://a.example.com ,",
    )
    origins = get_cors_origins(s)
    assert origins.count("https://a.example.com") == 1
    assert "https://web.example.com" in origins


@pytest.mark.unit
def test_docs_off_in_prod_by_default_and_on_in_dev():
    assert should_enable_docs(_settings(env="prod")) is False
    assert should_enable_docs(_settings(env="dev")) is True
    assert should_enable_docs(_settings(env="prod", enable_docs=True)) is True
    assert should_enable_docs(_settings(env="dev", enable_docs=False)) is False
