
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql.expression import func

metadata = MetaData()

users_table = Table(
    "users",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column("email", String(40), unique=True, index=True),
    Column("name", String(100)),
    Column("hashed_password", String()),
    Column("is_active", Boolean(), default=True, nullable=False),
)

tokens_table = Table(
    "tokens",
    metadata,
    Column("id", Integer(), primary_key=True),
    Column(
        "token",
        UUID(as_uuid=False),
        server_default=func.gen_random_uuid(),
        unique=True,
        nullable=False,
        index=True,
    ),
    Column("expires", DateTime()),
    Column("user_id", ForeignKey(users_table.c.id)),
)