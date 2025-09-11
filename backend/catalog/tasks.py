from celery import shared_task
from asgiref.sync import async_to_sync
from tgbot.loader import bot
from tgbot.text import get_application_text
from tgbot.keyboards import get_status_btn
from tgbot.config import MANAGER_IDS
from catalog.models import Application


@shared_task
def send_application_notification(application_id):
    try:
        app = Application.objects.get(pk=application_id)
    except Application.DoesNotExist:
        return

    msg = async_to_sync(get_application_text)(app)
    kb = get_status_btn(app.pk, app.is_processed)
    for chat_id in MANAGER_IDS:
        async_to_sync(bot.send_message)(chat_id, msg, kb)
