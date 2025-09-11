from django.db import models
from django.core.validators import FileExtensionValidator
from .common import Status, Designer
from urllib.parse import unquote
import requests
from django.core.exceptions import ValidationError


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
        validators=[FileExtensionValidator(allowed_extensions=['stl'])],
        blank=True, null=True
    )
    stl_coordinates = models.JSONField(
        blank=True,
        null=True,
        verbose_name='Координаты и направление камеры по умолчанию.',
        help_text='Пример: {"cameraPosition": [0, 0, 150], "target": [0, 0, 0]}'
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

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

    class Meta:
        verbose_name = 'МАФ'
        verbose_name_plural = 'МАФы'


class MafImage(models.Model):
    maf = models.ForeignKey('Maf', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to='maf_images/', verbose_name='Изображение',
        blank=True, null=True
    )

    def __str__(self):
        return f"Image for {self.maf.name} ({self.pk})"

    class Meta:
        verbose_name = "Изображение МАФа"
        verbose_name_plural = "Изображения МАФов"


class MafFile(models.Model):
    maf = models.ForeignKey(
        Maf, on_delete=models.CASCADE, related_name='files'
    )
    yandex_disk_link = models.URLField(
        max_length=512,
        verbose_name="Yandex Disk Public Link",
        help_text="Paste Yandex Disk public sharing link here",
        blank=True,
        null=True
    )
    original_filename = models.CharField(
        max_length=255,
        verbose_name="Original Filename",
        blank=True,
        help_text="Leave blank to auto-fill from Yandex Disk if possible."
    )
    mime_type = models.CharField(
        max_length=100, default="application/pdf"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Файл МАФа"
        verbose_name_plural = "Файлы МАФов"

    def clean(self):
        if self.yandex_disk_link and not self.yandex_disk_link.startswith("http"):
            raise ValidationError("Yandex Disk link must be a valid URL.")
        if self.original_filename and not self.original_filename.lower().endswith('.pdf'):
            raise ValidationError("Only PDF files are allowed (filename must end with .pdf).")
        if self.mime_type and self.mime_type != "application/pdf":
            raise ValidationError("Mime type must be application/pdf.")

    def save(self, *args, **kwargs):
        if not self.original_filename:
            self.original_filename = self.get_yandex_filename_from_link() or "yandex_file.pdf"
        if self.mime_type == "application/pdf" and not self.original_filename.lower().endswith('.pdf'):
            self.original_filename += ".pdf"
        super().save(*args, **kwargs)

    def get_yandex_filename_from_link(self):
        return None

    def __str__(self):
        return f"{self.original_filename} ({self.maf.name})"
