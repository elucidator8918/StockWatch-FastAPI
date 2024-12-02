from pydantic import BaseModel, Field


class User(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    age: int
    gender: str
    stocks_list: list[str] = []
    watch_list: list[str] = []
    first_login: bool = True
    risk: str or None = None


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str or None = None


class UserInDB(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str = Field(..., alias="hashed_password")
    age: int
    gender: str
    stocks_list: list[str] = []
    watch_list: list[str] = []
    first_login: bool = True
    risk: str or None = None


class TickerRequest(BaseModel):
    ticker: str
