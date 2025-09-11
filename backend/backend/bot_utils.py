import asyncio
import threading
from aiogram import Bot
from .settings import BOT_TOKEN


bot = Bot(token=BOT_TOKEN)
loop = asyncio.new_event_loop()
threading.Thread(target=loop.run_forever, daemon=True).start()


def run_async_task(coro):
    asyncio.run_coroutine_threadsafe(coro, loop)


def send_message(chat_id, text, kb=None):
    run_async_task(bot.send_message(chat_id, text, reply_markup=kb))
