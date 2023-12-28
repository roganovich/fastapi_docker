from sqlalchemy import MetaData, Table, Column, Integer, String

metadata = MetaData()

types_table = Table(
    "types",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("name", String(100)),
)