from os import environ

import databases

# Берем параметры БД из переменных окружения
POSTGRES_USER = environ.get("POSTGRES_USER", "root")
POSTGRES_PASSWORD = environ.get("POSTGRES_PASSWORD", "")
POSTGRES_HOST = environ.get("POSTGRES_HOST", "localhost")
POSTGRES_DB =environ.get("POSTGRES_DB", "base")

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"
)
# Создаем объект database, который будет использоваться для выполнения запросов
database = databases.Database(SQLALCHEMY_DATABASE_URL)