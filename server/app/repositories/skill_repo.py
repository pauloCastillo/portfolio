from fastapi import HTTPException, status
from sqlalchemy import select

from app.db.models.skills import Skill

class SkillRepository:
    
    @classmethod
    def get_skills(self, db):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Skill))
        users = result.scalars().all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
        return users
    
    @classmethod
    def get_skill(self, db, skill_id: int):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        result = db.execute(select(Skill).where(Skill.id == skill_id))
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    
    @classmethod
    def create_skill(self, db, skill):
        if not db:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database connection error")
        
        new_skill = Skill(**skill.model_dump())
        db.add(new_skill)
        db.commit()
        db.refresh(new_skill)
        return new_skill