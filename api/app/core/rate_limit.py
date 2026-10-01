"""Limiter compartido (slowapi) para app y endpoints.

Vive en módulo propio para evitar imports circulares:
`main.py` lo registra y `endpoints/auth.py` lo usa en decoradores.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address, default_limits=[])
