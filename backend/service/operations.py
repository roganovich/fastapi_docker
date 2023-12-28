from sqlalchemy import desc, func, select

from models.database import database
from models.operations import operations_table
from models.users import users_table
from models.types import types_table

from schemas.users import User
from schemas.operations import OperationsModel


async def get_list(user: User):
    query = (
        select(
            [
                operations_table.c.id,
                operations_table.c.user_id,
                operations_table.c.type_id,
                operations_table.c.amount,
                operations_table.c.created_at,
                operations_table.c.updated_at,
                types_table.c.id.label("types_id"),
                types_table.c.name.label("types_name"),
            ]
        )
        .select_from(operations_table.join(users_table).join(types_table))
        .where(operations_table.c.user_id == user.id)
        .order_by(desc(operations_table.c.updated_at))

    )
    operations = await database.fetch_all(query)
    response = []
    for operation in operations:
        operation = dict(zip(operation, operation.values()))
        operation['type'] = {
            'id': operation['types_id'],
            'title': operation['types_name'],
        }

        response.append(operation)

    return response


async def add(user: User, data: OperationsModel):
    query = (
        operations_table.insert()
        .values(user_id=user.id, type_id=data.type_id, amount=data.amount)
        .returning(operations_table.c.id)
    )
    return await database.fetch_one(query)
