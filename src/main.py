from fastapi import FastAPI
from typing import Union
from os import environ
import databases
from models.posts import posts_table

# берем параметры БД из переменных окружения
POSTGRES_USER = environ.get("POSTGRES_USER", "user")
POSTGRES_PASSWORD = environ.get("POSTGRES_PASSWORD", "password")
POSTGRES_HOST = environ.get("POSTGRES_HOST", "localhost")
POSTGRES_DB =environ.get("POSTGRES_DB", "localhost")
SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"
)
# создаем объект database, который будет использоваться для выполнения запросов
database = databases.Database(SQLALCHEMY_DATABASE_URL)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/posts")
async def list_item():
    # изменим роут таким образом, чтобы он брал данные из БД
    query = posts_table.select()
    return await database.fetch_all(query)
