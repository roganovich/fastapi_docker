from sqlalchemy import desc, func, select

from models.database import database
from models.categories import categories_table
from schemas.categories import CategoryModel, CategoryDetailsModel

async def get_categories(page: int):
    max_per_page = 10
    offset = (page - 1) * max_per_page
    query = (
        select(
            [
                categories_table.c.id,
                categories_table.c.parent_id,
                categories_table.c.title,
                categories_table.c.content
            ]
        )
        .select_from(categories_table)
        .order_by(desc(categories_table.c.title))
        .limit(max_per_page)
        .offset(offset)
    )
    categories = await database.fetch_all(query)
    response = []
    for category in categories:
        parent_id = category.parent_id
        parent = await get_one(parent_id)
        if (parent):
            category.parent = parent

        response.append(category)

    return response

async def create_category(
    category: CategoryModel
):
    query = (
        categories_table.insert()
        .values(
            parent_id=category.parent_id,
            title=category.title,
            content=category.content,
        )
        .returning(
            categories_table.c.id,
            categories_table.c.parent_id,
            categories_table.c.title,
            categories_table.c.content,
        )
    )
    category = await database.fetch_one(query)
    category = dict(zip(category, category.values()))
    return await get_category(category['id'])

async def get_one(category_id: int):
    query = (
        select(
            [
                categories_table.c.id,
                categories_table.c.parent_id,
                categories_table.c.title,
                categories_table.c.content,
            ]
        )
        .select_from(categories_table)
        .where(categories_table.c.id == category_id)
    )
    category = await database.fetch_one(query)
    if (category):
        category = dict(zip(category, category.values()))

    return None if category is None else category

async def get_category(category_id: int):
    category = await get_one(category_id)
    parent_id = category['parent_id']
    parent = await get_one(parent_id)
    category['parent'] = parent

    return category

async def delete_category(category_id: int):
    query = categories_table.delete().where(categories_table.c.id == category_id)
    return await database.execute(query)

async def update_category(
    category_id: int,
    category: CategoryModel
):
    query = (
        categories_table.update()
        .where(categories_table.c.id == category_id)
        .values(
            parent_id=category.parent_id,
            title=category.title,
            content=category.content,
        )
    )
    await database.execute(query)
    return await get_category(category_id)

async def get_categories_count():
    query = select([func.count()]).select_from(categories_table)
    return await database.fetch_val(query)
