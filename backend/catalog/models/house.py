from django.db import models
from django.core.validators import FileExtensionValidator
from .common import Designer, Status


class House(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    stl_file = models.FileField(
        upload_to='stl_models/',
        verbose_name='Файл STL',
        validators=[FileExtensionValidator(allowed_extensions=['stl'])]
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
