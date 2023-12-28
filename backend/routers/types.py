from fastapi import APIRouter
from schemas.types import TypesList
from service import types as types_service

router = APIRouter()

@router.get("/financial/types", response_model=TypesList, tags=["Financial"])
async def get_types_result():
    types =  await types_service.get_list()
    return {"results": types}