from app.domain.generic_repository import GenericRepository
from app.db.models.posts import Post


class PostRepository(GenericRepository[Post]):
    """
    Repository Pattern - Implementación específica para Post.
    """

    def __init__(self):
        super().__init__(Post)

    def get_published_posts(self, db):
        """Método específico del dominio para obtener posts publicados."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.published == True)
        )
        return result.scalars().all()

    def get_by_author(self, db, author_id):
        """Método específico del dominio para obtener posts de un autor."""
        from sqlalchemy import select

        result = db.execute(
            select(self.model).where(self.model.author_id == author_id)
        )
        return result.scalars().all()
