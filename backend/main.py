from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from models.database import database
from routers import posts, users, categories, bot

templates = Jinja2Templates(directory="templates")

app = FastAPI()
origins = [
    "http://localhost:5173",
    "localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup():
    # когда приложение запускается устанавливаем соединение с БД
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    # когда приложение останавливается разрываем соединение с БД
    await database.disconnect()

@app.get("/", response_class=HTMLResponse, tags=["System"])
async def root(request: Request):
    return templates.TemplateResponse("homepage.html", {"request": request})

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(categories.router)
app.include_router(bot.router)