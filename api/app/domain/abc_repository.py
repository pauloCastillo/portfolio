from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional
from uuid import UUID

T = TypeVar("T")


class IRepository(ABC, Generic[T]):
    """
    Abstract Factory Pattern para repositorios.
    Define el contrato para todas las operaciones CRUD.
    """

    @abstractmethod
    def get_all(self, db) -> List[T]:
        """Obtener todos los registros."""
        pass

    @abstractmethod
    def get_by_id(self, db, id: int) -> Optional[T]:
        """Obtener un registro por ID."""
        pass

    @abstractmethod
    def create(self, db, data) -> T:
        """Crear un nuevo registro."""
        pass

    @abstractmethod
    def update(self, db, id: int, data) -> Optional[T]:
        """Actualizar un registro existente."""
        pass

    @abstractmethod
    def delete(self, db, id: int) -> bool:
        """Eliminar un registro."""
        pass
