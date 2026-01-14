import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

connection = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_NAME'),
    port=os.getenv('DB_PORT')
)
cursor = connection.cursor()
cursor.execute("SELECT * FROM posts")
print(cursor.fetchall())
