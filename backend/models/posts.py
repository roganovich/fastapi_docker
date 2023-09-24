from sqlalchemy import MetaData, Table, Column, Integer, String, Text, ForeignKey, DateTime
from models.users import users_table
from models.categories import categories_table
metadata = MetaData()

posts_table = Table(
    "posts",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("categories_id", ForeignKey(categories_table.c.id)),
    Column("user_id", ForeignKey(users_table.c.id)),
    Column("created_at", DateTime()),
    Column("title", String(100)),
    Column("content", Text()),
)