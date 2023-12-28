from sqlalchemy import MetaData, ForeignKey, Table, Column, Integer, String, Float, DateTime
from models.types import types_table
from models.users import users_table

metadata = MetaData()

operations_table = Table(
    "operations",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("user_id", ForeignKey(users_table.c.id), nullable=True),
    Column("type_id", ForeignKey(types_table.c.id), nullable=True),
    Column("amount", Float()),
    Column("created_at", DateTime(), nullable=False),
    Column("updated_at", DateTime(), nullable=False),
)
