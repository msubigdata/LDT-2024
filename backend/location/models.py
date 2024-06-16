from typing import TYPE_CHECKING, Union

from django.db import models

if TYPE_CHECKING:
    from location.upload.models import FileUploadChunked


# Create your models here.
class Location(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    cameras: Union["Camera", models.Manager]

    class Meta:
        verbose_name = "Локация"
        verbose_name_plural = "Локации"

    def __str__(self):
        return self.title


class Camera(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    location = models.ForeignKey(Location, related_name="cameras", on_delete=models.CASCADE, verbose_name="Локация")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name="Долгота")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name="Широта")
    files: Union["File", models.Manager]

    class Meta:
        verbose_name = "Камера"
        verbose_name_plural = "Камеры"

    def __str__(self):
        return self.title


class File(models.Model):
    class TypeContent(models.TextChoices):
        VIDEO = "video", "Видео"
        PHOTO = "photo", "Фото"

    title = models.CharField(max_length=255, verbose_name="Название")
    camera = models.ForeignKey(Camera, related_name="files", on_delete=models.CASCADE, verbose_name="Камера")
    content = models.CharField(max_length=10, choices=TypeContent.choices, verbose_name="Тип содержимого")
    markdown = models.JSONField(default={}, null=True, blank=True, verbose_name="Markdown")
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    chunked_upload: Union["FileUploadChunked", models.Manager]

    class Meta:
        verbose_name = "Файл"
        verbose_name_plural = "Файлы"

    def __str__(self):
        return self.title
