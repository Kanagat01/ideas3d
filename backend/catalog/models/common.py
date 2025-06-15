from django.db import models


class Status(models.TextChoices):
    IN_DEVELOPMENT = 'DEV', 'В разработке'
    READY_TO_BUILD = 'RDY', 'Готов к постройке'


class Designer(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название компании")

    class Meta:
        verbose_name = "Дизайнер"
        verbose_name_plural = "Дизайнеры"

    def __str__(self):
        return self.name
