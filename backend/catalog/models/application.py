from django.db import models
from .house import House
from .maf import Maf

from asgiref.sync import async_to_sync
from tgbot.text import get_application_text
from tgbot.keyboards import get_status_btn
from tgbot.loader import bot
from tgbot.config import MANAGER_IDS


class Application(models.Model):
    full_name = models.CharField(max_length=200, verbose_name="Имя заказчика")
    contact = models.CharField(
        max_length=200, verbose_name="Телефон или Email")
    is_processed = models.BooleanField(
        default=False, verbose_name="Обработано")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Время создания")

    houses = models.ManyToManyField('House', through='ApplicationHouse')
    mafs = models.ManyToManyField('Maf', through='ApplicationMaf')

    def __str__(self):
        return f"Заявка от {self.full_name} ({self.contact})"

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
        ordering = ['created_at']

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            msg = async_to_sync(get_application_text)(self)
            kb = get_status_btn(self.pk, self.is_processed)
            for chat_id in MANAGER_IDS:
                async_to_sync(bot.send_message)(chat_id, msg, reply_markup=kb)


class ApplicationHouse(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    house = models.ForeignKey(House, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=1, verbose_name="Количество")

    class Meta:
        verbose_name = "Дом"
        verbose_name_plural = "Дома"

    def __str__(self):
        return f"Дом #{self.house.pk} - {self.house.name}"


class ApplicationMaf(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    maf = models.ForeignKey(Maf, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(default=1, verbose_name="Количество")

    class Meta:
        verbose_name = "МАФ"
        verbose_name_plural = "МАФы"

    def __str__(self):
        return f"МАФ #{self.maf.pk} - {self.maf.name}"
