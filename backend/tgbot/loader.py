from aiogram import Bot, Dispatcher

from .config import BOT_TOKEN, DEFAULT_BOT_PROPS

bot = Bot(token=BOT_TOKEN, default=DEFAULT_BOT_PROPS)
dp = Dispatcher()
