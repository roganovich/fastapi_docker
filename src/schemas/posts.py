from pydantic import  BaseModel, Field, validator
from datetime import datetime
from .users import UsersDetailsModel
class PostModel(BaseModel):
    title: str
    content: str

class PostDetailsModel(BaseModel):
    id: int
    created_at: str
    title: str
    content: str
    user: UsersDetailsModel
