from fastapi import HTTPException, status
from sqlalchemy import select
from typing import Generic, TypeVar, List, Optional

from app.domain.abc_repository import IRepository

T = TypeVar("T")


class GenericRepository(IRepository[T]):
    """
    Generic Repository Pattern - Implementación genérica para eliminar duplicación.
    Sigue el principio DRY (Don't Repeat Yourself).
    """

    def __init__(self, model: T):
        self.model = model

    def get_all(self, db) -> List[T]:
        """Obtener todos los registros con manejo uniforme de errores."""
        try:
            result = db.execute(select(self.model))
            items = result.scalars().all()
            if not items:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"No {self.model.__tablename__} found"
                )
            return items
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )

    def get_by_id(self, db, id: int) -> Optional[T]:
        """Obtener registro por ID con manejo uniforme de errores."""
        try:
            result = db.execute(select(self.model).where(self.model.id == id))
            item = result.scalars().first()

            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"{self.model.__name__} not found"
                )
            return item
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )

    def create(self, db, data) -> T:
        """Crear registro con manejo uniforme de errores."""
        try:
            new_item = self.model(**data.model_dump())
            db.add(new_item)
            db.commit()
            db.refresh(new_item)
            return new_item
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create {self.model.__name__}: {str(e)}"
            )

    def update(self, db, id: int, data) -> Optional[T]:
        """Actualizar registro con manejo uniforme de errores."""
        try:
            item = self.get_by_id(db, id)
            if not item:
                return None

            update_data = data.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(item, field, value)

            db.commit()
            db.refresh(item)
            return item
        except HTTPException:
            raise
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update {self.model.__name__}: {str(e)}"
            )

    def delete(self, db, id: int) -> bool:
        """Eliminar registro con manejo uniforme de errores."""
        try:
            item = self.get_by_id(db, id)
            if not item:
                return False

            db.delete(item)
            db.commit()
            return True
        except HTTPException:
            raise
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete {self.model.__name__}: {str(e)}"
            )
