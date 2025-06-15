import os
import sys
import logging
import asyncio
import django
from asgiref.sync import sync_to_async

import betterlogging as bl
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.enums.parse_mode import ParseMode
from aiogram.client.default import DefaultBotProperties

# Django setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


TOKEN = "7820796823:AAGEqvRuZpT2WEG0vhbOqJm0Ark2T1beIUg"
# TOKEN = os.environ.get('BOT_TOKEN')
bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()


@dp.message(Command("start"))
async def handle_start(message: types.Message):
    from catalog.models import Application
    from tgbot.utils import get_application_text, get_status_btn

    applications = await sync_to_async(list)(
        Application.objects.filter(is_processed=False)
    )

    if len(applications) == 0:
        await message.answer("Новых заявок нет.")
        return

    for app in applications:
        msg = await get_application_text(app)
        await message.answer(msg, reply_markup=get_status_btn(app.pk, app.is_processed))


@dp.callback_query(F.data.startswith("toggle_status:"))
async def toggle_application_status(callback: types.CallbackQuery):
    from catalog.models import Application
    from tgbot.utils import get_application_text, get_status_btn

    app_id = int(callback.data.split(":")[1])
    try:
        app = await sync_to_async(Application.objects.get)(id=app_id)
        app.is_processed = not app.is_processed
        await sync_to_async(app.save)()

        new_text = await get_application_text(app)
        await callback.message.edit_text(
            new_text,
            reply_markup=get_status_btn(app.pk, app.is_processed)
        )
        await callback.answer("Статус обновлён.")
    except Application.DoesNotExist:
        await callback.answer("Заявка не найдена.", show_alert=True)


logger = logging.getLogger(__name__)
log_level = logging.INFO
bl.basic_colorized_config(level=log_level)


async def main():
    logger.info("Bot is starting...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.warning("Bot stopped.")
