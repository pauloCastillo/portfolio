from fastapi import HTTPException, status
from sqlalchemy import select

from app.db.models.posts import Post

class PostRepository:
    
    @classmethod
    def get_posts(self, db):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Post))
        users = result.scalars().all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
        return users
    
    @classmethod
    def get_post(self, db, post_id: int):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Post).where(Post.id == post_id))
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    
    @classmethod
    def create_post(self, db, post):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        new_post = Post(**post.model_dump())
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post