from datetime import datetime
from sqlalchemy import desc, func, select

from models.database import database
from models.posts import posts_table
from models.users import users_table
from models.categories import categories_table
from schemas.posts import PostModel
from schemas.users import User

async def get_posts(page: int):
    max_per_page = 10
    offset1 = (page - 1) * max_per_page
    query = (
        select(
            [
                posts_table.c.id,
                posts_table.c.created_at,
                posts_table.c.title,
                posts_table.c.content,
                posts_table.c.user_id.label("user_id"),
                users_table.c.email.label("user_email"),
                users_table.c.name.label("user_name"),
                users_table.c.email.label("user_email"),
                posts_table.c.categories_id.label("categories_id"),
                categories_table.c.title.label("category_title"),
                categories_table.c.content.label("category_content"),
            ]
        )
        .select_from(posts_table.join(users_table))
        .order_by(desc(posts_table.c.created_at))
        .limit(max_per_page)
        .offset(offset1)
    )
    posts = await database.fetch_all(query)
    response = []
    for post in posts:
        post = dict(zip(post, post.values()))
        post['user'] = {
            'id': post['user_id'],
            'email': post['user_email'],
            'name': post['user_name']
        }
        post['category'] = {
            'id': post['categories_id'],
            'title': post['category_title'],
            'content': post['category_content']
        }
        #post['created_at'] = datetime.strftime(post['created_at'], "%d.%m.%Y %H:%M")


        del post['user_id']
        del post['user_email']
        del post['user_name']

        response.append(post)

    return response

async def create_post(
    post: PostModel,
    user: User
):
    query = (
        posts_table.insert()
        .values(
            created_at=datetime.now(),
            title=post.title,
            content=post.content,
            user_id=user["id"]
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
    return await get_post(post['id'])

async def get_post(post_id: int):
    query = (
        select(
            [
                posts_table.c.id,
                posts_table.c.created_at,
                posts_table.c.title,
                posts_table.c.content,
                posts_table.c.user_id.label("user_id"),
                users_table.c.email.label("user_email"),
                users_table.c.name.label("user_name"),
                posts_table.c.categories_id.label("categories_id"),
                categories_table.c.title.label("category_title"),
                categories_table.c.content.label("category_content"),
            ]
        )
        .select_from(posts_table.join(users_table))
        .where(posts_table.c.id == post_id)
    )
    post = await database.fetch_one(query)
    # Convert to dict and add user_name key to it
    post = dict(zip(post, post.values()))
    #post['created_at'] = datetime.strftime(post['created_at'], "%d.%m.%Y %H:%M")
    post['user'] = {
        'id': post['user_id'],
        'email': post['user_email'],
        'name': post['user_name']
    }
    post['category'] = {
        'id': post['categories_id'],
        'title': post['category_title'],
        'content': post['category_content']
    }
    return post

async def delete_post(post_id: int):
    query = posts_table.delete().where(posts_table.c.id == post_id)
    return await database.execute(query)

async def update_post(
    post_id: int,
    post: PostModel,
    user: User
):
    query = (
        posts_table.update()
        .where(posts_table.c.id == post_id)
        .values(
            title=post.title,
            content=post.content,
            user_id=user['id']
        )
    )
    await database.execute(query)
    return await get_post(post_id)

async def get_posts_count():
    query = select([func.count()]).select_from(posts_table)
    return await database.fetch_val(query)
