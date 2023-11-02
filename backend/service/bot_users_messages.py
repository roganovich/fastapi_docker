from datetime import datetime
from sqlalchemy import desc, func, select

from models.database import database
from models.bot_users_messages import bot_users_messages_table

async def get_bot_users_messages(bot_user_id: int):
    query = bot_users_messages_table.select().where(bot_user_id.c.id == bot_user_id)
    return await database.fetch_all(query)

async def create_bot_users_messages(bot_user_id: int, text: str):
    query = (
        bot_users_messages_table.insert()
        .values(
            bot_user_id=bot_user_id,
            text=text,
        ).returning(bot_users_messages_table.c.id)
    )
    await database.fetch_one(query)
    return await get_bot_users_messages(bot_user_id)