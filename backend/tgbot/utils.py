from asgiref.sync import sync_to_async
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from catalog.models import Application


def get_status_btn(app_id: int, is_processed: bool) -> InlineKeyboardMarkup:
    text = "✅ Обработано" if not is_processed else "❌ Не обработано"
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text=text,
            callback_data=f"toggle_status:{app_id}"
        )
    ]])


async def get_application_text(app: Application):
    from catalog.models import ApplicationHouse, ApplicationMaf

    houses = await sync_to_async(list)(
        ApplicationHouse.objects.filter(
            application=app).select_related('house')
    )
    mafs = await sync_to_async(list)(
        ApplicationMaf.objects.filter(
            application=app).select_related('maf')
    )

    house_lines = [
        f"🏠 <b>{ah.house.name}</b> — {ah.amount} шт. по {ah.house.price}₽"
        for ah in houses
    ]
    maf_lines = [
        f"🛖 <b>{am.maf.name}</b> — {am.amount} шт. по {am.maf.price}₽"
        for am in mafs
    ]

    parts = [
        f"<b>Заявка #{app.pk}</b>",
        f"<b>Имя:</b> {app.full_name}",
        f"<b>Контакт:</b> {app.contact}",
        f"<b>Создано:</b> {app.created_at.strftime('%d.%m.%Y %H:%M')}",
        f"<b>Статус:</b> {'✅ Обработано' if app.is_processed else '❌ Не обработано'}\n",
    ]

    houses_info = "\n".join(house_lines)
    if houses_info:
        parts.append(f"<b>Дома:</b>\n{houses_info}\n")

    mafs_info = "\n".join(maf_lines)
    if mafs_info:
        prefix = "\n" if houses_info else ""
        parts.append(f"{prefix}<b>МАФы:</b>\n{mafs_info}\n")

    new_text = "\n".join(parts)
    return new_text
