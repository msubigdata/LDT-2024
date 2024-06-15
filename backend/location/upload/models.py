from django.db import models
from drf_chunked_upload.models import ChunkedUpload

from location.models import File


class FileUploadChunked(ChunkedUpload):
    file = models.OneToOneField(File, models.CASCADE, verbose_name="Файл", related_name="chunked_upload")

    class Meta:
        verbose_name = "Чанк"
        verbose_name_plural = "Чанки"
