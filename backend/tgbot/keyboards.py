from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton


def get_status_btn(app_id: int, is_processed: bool) -> InlineKeyboardMarkup:
    text = "✅ Обработано" if not is_processed else "❌ Не обработано"
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text=text,
            callback_data=f"toggle_status:{app_id}"
        )
    ]])
