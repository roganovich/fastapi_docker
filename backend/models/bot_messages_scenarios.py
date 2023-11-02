from sqlalchemy import MetaData, Table, Column, Integer, String, Text, ForeignKey
metadata = MetaData()

bot_messages_scenarios_table = Table(
    "bot_messages_scenarios",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("name", String(100), nullable=False),
    Column("description", String(255), nullable=True),
    Column("command", String(100), nullable=True),
    Column("class_name", String(100), nullable=True),
)
