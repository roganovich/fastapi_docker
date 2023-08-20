from os import environ

import databases

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