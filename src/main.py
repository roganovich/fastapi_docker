from fastapi import FastAPI
from models.database import database
from routers import posts, users
app = FastAPI()

@app.on_event("startup")
async def startup():
    # когда приложение запускается устанавливаем соединение с БД
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    # когда приложение останавливается разрываем соединение с БД
    await database.disconnect()

@app.get("/", tags=["System"])
async def root():
    return {"message": "FastApi"}

app.include_router(posts.router)
app.include_router(users.router)