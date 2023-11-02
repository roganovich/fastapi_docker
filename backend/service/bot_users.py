from datetime import datetime
from sqlalchemy import desc, func, select

from models.database import database
from models.bot_users import bot_users_table

def get_bot_user(chat_id: int):
    query = bot_users_table.select().where(bot_users_table.c.chat_id == chat_id)
    return database.fetch_one(query)

def create_bot_user(chat_id: int,
                      username: str,
                      first_name: str,
                      last_name: str,
                      language_code: str):
    query = (
        bot_users_table.insert()
        .values(
            chat_id=chat_id,
            username=username,
            first_name=first_name,
            last_name=last_name,
            language_code=language_code,
        ).returning(bot_users_table.c.id)
    )
    database.fetch_one(query)
    return get_bot_user(chat_id)