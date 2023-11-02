from sqlalchemy import MetaData, Table, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from models.bot_users import bot_users_table
from models.bot_messages_scenarios import bot_messages_scenarios_table

metadata = MetaData()

bot_users_messages_table = Table(
    "bot_users_messages",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("bot_user_id", ForeignKey(bot_users_table.c.id), nullable=False),
    Column("scenario_id", ForeignKey(bot_messages_scenarios_table.c.id), nullable=True),
    Column("text", Text(), nullable=True),
    Column("chain", Text(), nullable=True),
    Column("entities", Text(), nullable=True),
    Column("created_at", DateTime(), nullable=False),
    Column("updated_at", DateTime(), nullable=False),
)