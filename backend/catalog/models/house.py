from django.db import models
from django.core.validators import FileExtensionValidator
from .common import Designer, Status
from django.core.exceptions import ValidationError


class House(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    stl_file = models.FileField(
        upload_to='stl_models/',
        verbose_name='Файл STL',
        validators=[FileExtensionValidator(allowed_extensions=['stl'])],
         blank=True,
         null=True
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
    designer = models.ForeignKey(
        Designer, on_delete=models.CASCADE, verbose_name='Дизайнер')
    living_area = models.DecimalField(
        max_digits=7, decimal_places=2, verbose_name='Жилая площадь (м²)')
    total_area = models.DecimalField(
        max_digits=7, decimal_places=2, verbose_name='Общая площадь (м²)')
    duration = models.CharField(max_length=30, verbose_name='Время постройки')
    status = models.CharField(
        max_length=3,
        choices=Status.choices,
        default=Status.IN_DEVELOPMENT,
        verbose_name='Статус'
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")


    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

    class Meta:
        verbose_name = 'Дом'
        verbose_name_plural = 'Дома'


class HouseImage(models.Model):
    house = models.ForeignKey(
        House, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to='house_images/', verbose_name='Изображение')

    def __str__(self):
        return f"Image for {self.house.name} ({self.pk})"

    class Meta:
        verbose_name = 'Изображение дома'
        verbose_name_plural = 'Изображения дома'


class Floor(models.Model):
    house = models.ForeignKey(
        House, on_delete=models.CASCADE, related_name='floors')
    name = models.CharField(max_length=100, verbose_name='Название этажа')
    plan_image = models.ImageField(
        upload_to='floor_plans/', verbose_name='План этажа')

    order = models.PositiveIntegerField(
        default=0,
        verbose_name='Порядок',
        help_text='Чем ниже — тем выше этаж в списке'
    )

    def __str__(self):
        return f"{self.house.name} — {self.name}"

    class Meta:
        verbose_name = 'Этаж'
        verbose_name_plural = 'Этажи'
        ordering = ['order']


class Room(models.Model):
    floor = models.ForeignKey(
        Floor, on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=100, verbose_name='Название комнаты')
    area = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Площадь (м²)'
    )

    def __str__(self):
        return f"{self.floor} - {self.name} ({self.area} м²)"

    class Meta:
        verbose_name = 'Комната'
        verbose_name_plural = 'Комнаты'
        ordering = ['name']

class HouseFile(models.Model):
    house = models.ForeignKey(
        House, on_delete=models.CASCADE, related_name='files'
    )
    yandex_disk_link = models.URLField(
        max_length=512, verbose_name="Yandex Disk Public Link",
        help_text="Paste Yandex Disk public sharing link here",
         blank=True,
    null=True,
    )
    original_filename = models.CharField(
        max_length=255, verbose_name="Original Filename",
        blank=True,
        help_text="Leave blank to auto-fill from Yandex Disk if possible."
    )
    mime_type = models.CharField(
        max_length=100, default="application/pdf"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Файл дома"
        verbose_name_plural = "Файлы домов"
    
    def clean(self):
        if not self.yandex_disk_link:
            raise ValidationError("Yandex Disk link is required.")
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
        return f"{self.original_filename} ({self.house.name})"
