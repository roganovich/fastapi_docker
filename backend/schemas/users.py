from pydantic import UUID4, BaseModel, EmailStr, Field, validator
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class UsersDetailsModel(BaseModel):
    id: int
    email: EmailStr
    name: str

class TokenBase(BaseModel):
    token: UUID4
    expires: datetime

class User(UsersDetailsModel):
    token: TokenBase = {}
