from fastapi import APIRouter, Depends, HTTPException, status
from schemas.games import GameTableResult
from service import games as games_service
from var_dump import var_dump

router = APIRouter()

@router.post("/games/table/result", response_model=GameTableResult, tags=["Games"])
async def game_table_result(data: dict):
    return await games_service.get_table_result(data)