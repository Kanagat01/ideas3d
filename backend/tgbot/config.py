from django.conf import settings
from aiogram.enums.parse_mode import ParseMode
from aiogram.client.default import DefaultBotProperties

PARSE_MODE = ParseMode.HTML
DEFAULT_BOT_PROPS = DefaultBotProperties(parse_mode=PARSE_MODE)

MANAGER_IDS = getattr(settings, 'MANAGER_TG_IDS', [])
BOT_TOKEN = getattr(settings, 'BOT_TOKEN', "")
