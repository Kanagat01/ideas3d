from django.db import models
from django.core.validators import FileExtensionValidator
from .common import Status, Designer


class MafStyle(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название")

    class Meta:
        verbose_name = "Стиль МАФа"
        verbose_name_plural = "Стили МАФов"

    def __str__(self):
        return self.name


class MafType(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название")

    class Meta:
        verbose_name = "Тип МАФа"
        verbose_name_plural = "Типы МАФов"

    def __str__(self):
        return self.name


class Maf(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    stl_file = models.FileField(
        upload_to='stl_models/',
        verbose_name='Файл STL',
        validators=[FileExtensionValidator(allowed_extensions=['stl'])]
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name='Стоимость, ₽')
    description = models.TextField(blank=True, verbose_name='Описание')
    status = models.CharField(
        max_length=3, choices=Status.choices, default=Status.IN_DEVELOPMENT, verbose_name='Статус')
    designer = models.ForeignKey(
        Designer, on_delete=models.CASCADE, verbose_name='Дизайнер')
    duration = models.CharField(max_length=100, verbose_name='Время постройки')
    style = models.ForeignKey(
        MafStyle, on_delete=models.CASCADE, verbose_name='Стиль')
    type = models.ForeignKey(
        MafType, on_delete=models.CASCADE, verbose_name='Тип')

    # Габариты
    length = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Длина (см)')
    width = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Ширина (см)')
    height = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Высота (см)')
    diameter = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, verbose_name='Диаметр (см)')

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

    class Meta:
        verbose_name = 'МАФ'
        verbose_name_plural = 'МАФы'
