from sqlalchemy import MetaData, Table, Column, Integer, String, Text, ForeignKey

metadata = MetaData()

categories_table = Table(
    "categories",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("parent_id", Integer()),
    Column("title", String(100)),
    Column("content", Text(), nullable=True),
)