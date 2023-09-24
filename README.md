## Запуск в Focker
```bash
docker-compose build
```
```bash
docker-compose up -d
```
## Установка пакетов
```bash
pip install -r requirements.txt
```
## Создание миграции
```bash
alembic revision -m "create table"
```

## Запуск локального сервера
```bash
uvicorn main:app --reload --host=127.0.0.1 --port=8081 --env-file ../.env
```
### Swagger UI
/docs
```
alembic revision --autogenerate -m "Added required tables"
alembic upgrade head
```
# Frontend
```bash
yarn create vite
```