from fastapi import HTTPException, status
from sqlalchemy import select

from app.db.models.techs import Technology

class TechRepository:
    
    @classmethod
    def get_technologies(self, db):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Technology))
        users = result.scalars().all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
        return users
    
    @classmethod
    def get_technology(self, db, tech_id: int):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Technology).where(Technology.id == tech_id))
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    
    @classmethod
    def create_technology(self, db, tech):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        new_tech = Technology(**tech.model_dump())
        db.add(new_tech)
        db.commit()
        db.refresh(new_tech)
        return new_tech