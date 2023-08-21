from datetime import datetime
from models.database import database
from models.posts import posts_table
from schemas import posts as posts_schema
from sqlalchemy import desc, func, select

async def get_posts(page: int):
    query = posts_table.select()
    return await database.fetch_all(query)

async def create_post(post: posts_schema.PostModel):
    created_at = datetime.now()
    query = (
        posts_table.insert()
        .values(
            created_at=created_at,
            title=post.title,
            content=post.content
        )
        .returning(
            posts_table.c.id,
            posts_table.c.title,
            posts_table.c.content,
            posts_table.c.created_at,
        )
    )
    post = await database.fetch_one(query)
    post = dict(zip(post, post.values()))
    return post

async def get_post(post_id: int):
    query = posts_table.select().where(posts_table.c.id == post_id)
    return await database.fetch_one(query)

async def delete_post(post_id: int):
    query = posts_table.delete().where(posts_table.c.id == post_id)
    return await database.execute(query)

async def update_post(post_id: int, post: posts_schema.PostModel):
    query = (
        posts_table.update()
        .where(posts_table.c.id == post_id)
        .values(title=post.title, content=post.content)
    )
    return await database.execute(query)

async def get_posts_count():
    query = select([func.count()]).select_from(posts_table)
    return await database.fetch_val(query)
