from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

load_dotenv(".env.local")

DB_USER = os.getenv("USER_DB")
DB_PASSWORD = os.getenv("PASSWORD_DB")
DB_HOST = os.getenv("HOST_DB")
DB_PORT = os.getenv("PORT_DB")
DB_NAME = os.getenv("NAME_DB")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4&collation=utf8mb4_unicode_ci"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    with SessionLocal() as db:
        yield db

Base.metadata.create_all(bind=engine)