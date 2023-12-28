from sqlalchemy import desc, func, select

from models.database import database
from models.types import types_table


async def get_list():
    query = (
        select(
            [
                types_table.c.id,
                types_table.c.name,
            ]
        )
        .select_from(types_table)
        .order_by(desc(types_table.c.name))
    )
    response = await database.fetch_all(query)

    return response
