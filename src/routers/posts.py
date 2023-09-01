from schemas.posts import PostDetailsModel, PostModel, PostList
from schemas.users import User
from service.dependencies import get_current_user
from service import posts as posts_service

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

@router.post("/posts", response_model=PostDetailsModel, status_code=201, tags=["Posts"])
async def create_post(
    post: PostModel,
    current_user: User = Depends(get_current_user)
):
    return await posts_service.create_post(post, current_user)

@router.get("/posts", response_model=PostList, tags=["Posts"])
async def get_posts(page: int = 1):
    total_cout = await posts_service.get_posts_count()
    posts = await posts_service.get_posts(page)
    return {"total_count": total_cout, "results": posts}

@router.get("/posts/{post_id}", response_model=PostDetailsModel, tags=["Posts"])
async def get_post(post_id: int):
    return await posts_service.get_post(post_id)

@router.delete("/posts/{post_id}", tags=["Posts"])
async def get_post(post_id: int):
    return await posts_service.delete_post(post_id)

@router.put("/posts/{post_id}", response_model=PostDetailsModel, tags=["Posts"])
async def update_post(
    post_id: int, post_data: PostModel,
    current_user: User = Depends(get_current_user)
):
    await posts_service.update_post(post_id=post_id, post=post_data, user=current_user)
    return await posts_service.get_post(post_id)