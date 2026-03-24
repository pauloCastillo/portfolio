from fastapi import HTTPException, status
from sqlalchemy import select

from app.db.models.experience import Experience

class ExperienceRepository:
    
    @classmethod
    def get_experiences(self, db):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Experience))
        users = result.scalars().all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
        return users
    
    @classmethod
    def get_experience(self, db, experience_id: int):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Experience).where(Experience.id == experience_id))
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    
    @classmethod
    def create_experience(self, db, experience):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        new_experience = Experience(**experience.model_dump())
        db.add(new_experience)
        db.commit()
        db.refresh(new_experience)
        return new_experience