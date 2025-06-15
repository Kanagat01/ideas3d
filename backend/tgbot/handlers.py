from aiogram import types, F
from aiogram.filters import Command
from asgiref.sync import sync_to_async

from .loader import dp
from .text import get_application_text
from .keyboards import get_status_btn
from catalog.models import Application


@dp.message(Command("start"))
async def handle_start(message: types.Message):
    applications = await sync_to_async(list)(
        Application.objects.filter(is_processed=False)
    )

    if not applications:
        await message.answer("Новых заявок нет.")
        return

    for app in applications:
        msg = await get_application_text(app)
        await message.answer(msg, reply_markup=get_status_btn(app.pk, app.is_processed))


@dp.callback_query(F.data.startswith("toggle_status:"))
async def toggle_application_status(callback: types.CallbackQuery):
    app_id = int(callback.data.split(":")[1])
    try:
        app = await sync_to_async(Application.objects.get)(id=app_id)
        app.is_processed = not app.is_processed
        await sync_to_async(app.save)()

        msg = await get_application_text(app)
        await callback.message.edit_text(msg, reply_markup=get_status_btn(app.pk, app.is_processed))
        await callback.answer("Статус обновлён.")
    except Application.DoesNotExist:
        await callback.answer("Заявка не найдена.", show_alert=True)
