import os
import sys
import logging
import django
import asyncio
import betterlogging as bl

# Django setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


bl.basic_colorized_config(level=logging.INFO)
logger = logging.getLogger(__name__)


async def main():
    from .loader import dp, bot
    from . import handlers
    logger.info("Bot is starting...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
