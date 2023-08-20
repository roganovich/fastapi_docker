from schemas.posts import PostDetailsModel, PostModel
from service import posts as posts_service
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.post("/posts", response_model=PostDetailsModel, status_code=201)
async def create_post(post: PostModel):
    post = await posts_service.create_post(post)
    return post

@router.get("/posts")
async def get_posts(page: int = 1):
    total_cout = await posts_service.get_posts_count()
    posts = await posts_service.get_posts(page)
    return {"total_count": total_cout, "results": posts}


@router.get("/posts/{post_id}", response_model=PostDetailsModel)
async def get_post(post_id: int):
    return await posts_service.get_post(post_id)


@router.put("/posts/{post_id}", response_model=PostDetailsModel)
async def update_post(
    post_id: int, post_data: PostModel
):
    post = await posts_service.get_post(post_id)

    await posts_service.update_post(post_id=post_id, post=post_data)
    return await posts_service.get_post(post_id)