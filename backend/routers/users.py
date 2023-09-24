from schemas.users import User, TokenBase, UsersDetailsModel, UserCreate
from service import users as users_service
from service.dependencies import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/auth", response_model=TokenBase, tags=["Users"])
async def auth(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await users_service.get_user_by_email(email=form_data.username)

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not users_service.validate_password(
        password=form_data.password, hashed_password=user["hashed_password"]
    ):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    return await users_service.create_user_token(user_id=user["id"])

@router.post("/sign-up", response_model=User, tags=["Users"])
async def create_user(user: UserCreate):
    db_user = await users_service.get_user_by_email(email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await users_service.create_user(user=user)

@router.get("/users/me", response_model=UsersDetailsModel, tags=["Users"])
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user