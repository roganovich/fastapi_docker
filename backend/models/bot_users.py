from sqlalchemy import MetaData, Table, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from models.users import users_table

metadata = MetaData()

bot_users_table = Table(
    "bot_users",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("chat_id", Integer(), nullable=False),
    Column("user_id", ForeignKey(users_table.c.id), nullable=True),
    Column("username", String(255), nullable=True),
    Column("first_name", String(255), nullable=True),
    Column("last_name", String(255), nullable=True),
    Column("language_code", String(64), nullable=True),
    Column("is_bot", Boolean(), default=False),
    Column("is_premium", Boolean(), default=False),
    Column("status", Integer(), default=1),
    Column("created_at", DateTime(), nullable=False),
    Column("updated_at", DateTime(), nullable=False),
)
