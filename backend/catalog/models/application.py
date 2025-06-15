from django.db import models
from .house import House
from .maf import Maf


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
        ordering = ['-created_at']


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
