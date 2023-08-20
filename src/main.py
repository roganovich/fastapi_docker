from fastapi import FastAPI
from models.database import database
from routers import posts

app = FastAPI()

@app.on_event("startup")
async def startup():
    # когда приложение запускается устанавливаем соединение с БД
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    # когда приложение останавливается разрываем соединение с БД
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(posts.router)