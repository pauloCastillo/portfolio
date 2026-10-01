from typing import Generic, TypeVar, List, Optional
from domain.generic_repository import GenericRepository

T = TypeVar("T")


class BaseService(Generic[T]):
    """
    Service Pattern - Capa de lógica de negocio.
    Sigue el principio de Single Responsibility (SRP).
    """

    def __init__(self, repository: GenericRepository[T]):
        self.repository = repository

    def get_all(self, db) -> List[T]:
        """Obtener todos los elementos."""
        return self.repository.get_all(db)

    def get_by_id(self, db, id: int) -> Optional[T]:
        """Obtener elemento por ID."""
        return self.repository.get_by_id(db, id)

    def create(self, db, data) -> T:
        """Crear nuevo elemento."""
        return self.repository.create(db, data)

    def update(self, db, id: int, data) -> Optional[T]:
        """Actualizar elemento."""
        return self.repository.update(db, id, data)

    def delete(self, db, id: int) -> bool:
        """Eliminar elemento."""
        return self.repository.delete(db, id)
