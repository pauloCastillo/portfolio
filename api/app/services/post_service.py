from services.base_service import BaseService
from repositories.post_repo import PostRepository


class PostService(BaseService[PostRepository]):
    """
    Service Pattern - Lógica de negocio para Post.
    """

    def __init__(self):
        super().__init__(PostRepository())

    def get_published_posts(self, db):
        """Obtener solo posts publicados."""
        return self.repository.get_published_posts(db)

    def get_by_author(self, db, author_id):
        """Obtener posts de un autor específico."""
        return self.repository.get_by_author(db, author_id)
