import asyncio
from catalog.models import Application
from tgbot.loader import bot
from tgbot.text import get_application_text
from tgbot.keyboards import get_status_btn
from tgbot.config import MANAGER_IDS


def send_application_notification(application_id):
    try:
        app = Application.objects.get(pk=application_id)
    except Application.DoesNotExist:
        return

    async def _send():
        msg = await get_application_text(app)
        kb = get_status_btn(app.pk, app.is_processed)
        for chat_id in MANAGER_IDS:
            await bot.send_message(chat_id, msg, reply_markup=kb)

    asyncio.run(_send())
