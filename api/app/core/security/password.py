import bcrypt


def get_password_hash(password: str) -> str:
    """
    Genera un hash seguro de la contraseña utilizando bcrypt.

    Args:
        password: Contraseña en texto plano

    Returns:
        Hash de la contraseña en formato string
    """
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con su hash.

    Args:
        plain_password: Contraseña en texto plano
        hashed_password: Hash de la contraseña almacenado

    Returns:
        True si la contraseña es correcta, False en caso contrario
    """
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )
