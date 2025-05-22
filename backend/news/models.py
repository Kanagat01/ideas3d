from django.db import models


class News(models.Model):
    title = models.CharField(verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    img = models.ImageField(upload_to='images/', verbose_name="Изображение")

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title
