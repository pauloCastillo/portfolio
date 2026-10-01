"""Task 2.1: validación estricta de uploads (marca: unit)."""

import re
from io import BytesIO
from pathlib import Path

import pytest
from PIL import Image

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "public" / "media"


def _png_bytes(size: tuple[int, int] = (64, 64)) -> bytes:
    img = Image.new("RGB", size, color=(200, 30, 30))
    buf = BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


@pytest.mark.unit
def test_svg_upload_is_rejected(auth_client):
    r = auth_client.post(
        "/api/v1/projects/upload/image",
        files={"file": ("evil.svg", b"<svg xmlns='http://www.w3.org/2000/svg'></svg>", "image/svg+xml")},
    )
    assert r.status_code == 400
    assert "Invalid image type" in r.json()["detail"]
    assert not list(UPLOAD_DIR.glob("*evil*"))


@pytest.mark.unit
def test_spoofed_mime_is_rejected(auth_client):
    r = auth_client.post(
        "/api/v1/projects/upload/image",
        files={"file": ("fake.png", b"this is not image bytes", "image/png")},
    )
    assert r.status_code == 400


@pytest.mark.unit
def test_oversize_is_rejected_by_actual_bytes(auth_client):
    big = b"a" * (31 * 1024 * 1024)
    r = auth_client.post(
        "/api/v1/projects/upload/image",
        files={"file": ("big.png", big, "image/png")},
    )
    assert r.status_code in (400, 413)


@pytest.mark.unit
def test_valid_png_accepted_with_random_filename(auth_client):
    data = _png_bytes()
    r = auth_client.post(
        "/api/v1/projects/upload/image",
        files={"file": ("my-photo.png", data, "image/png")},
    )
    assert r.status_code == 201, r.text
    body = r.json()
    assert re.fullmatch(r"[0-9a-f]{32}\.png", body["filename"]), body
    assert "my-photo" not in body["filename"]
    assert body["path"] == f"/public/media/{body['filename']}"
    stored = UPLOAD_DIR / body["filename"]
    assert stored.exists()
    stored.unlink()


@pytest.mark.unit
def test_unauthenticated_upload_rejected(client):
    r = client.post(
        "/api/v1/projects/upload/image",
        files={"file": ("x.png", _png_bytes(), "image/png")},
    )
    assert r.status_code in (401, 403)
