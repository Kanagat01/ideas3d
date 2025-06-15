from asgiref.sync import sync_to_async


async def get_application_text(app):
    from catalog.models import ApplicationHouse, ApplicationMaf

    houses = await sync_to_async(list)(
        ApplicationHouse.objects.filter(
            application=app).select_related("house")
    )
    mafs = await sync_to_async(list)(
        ApplicationMaf.objects.filter(application=app).select_related("maf")
    )

    parts = [
        f"<b>Заявка #{app.pk}</b>",
        f"<b>Имя:</b> {app.full_name}",
        f"<b>Контакт:</b> {app.contact}",
        f"<b>Создано:</b> {app.created_at.strftime('%d.%m.%Y %H:%M')}",
        f"<b>Статус:</b> {'✅ Обработано' if app.is_processed else '❌ Не обработано'}\n",
    ]

    if houses:
        parts.append("<b>Дома:</b>")
        parts.extend(
            f"🏠 <b>{h.house.name}</b> — {h.amount} шт. по {h.house.price}₽"
            for h in houses
        )

    if mafs:
        parts.append("<b>МАФы:</b>")
        parts.extend(
            f"🛖 <b>{m.maf.name}</b> — {m.amount} шт. по {m.maf.price}₽"
            for m in mafs
        )

    return "\n".join(parts)
