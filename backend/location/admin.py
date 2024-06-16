# Register your models here.
from django.contrib import admin

from location.models import Camera, File, Location
from location.upload.models import FileUploadChunked


@admin.register(FileUploadChunked)
class FileUploadChunkedAdmin(admin.ModelAdmin):
    pass


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "longitude", "latitude")
    autocomplete_fields = ("location",)
    search_fields = ("title",)


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ("title", "camera", "created_date")
    search_fields = ("title",)
    list_filter = ("created_date", "content")
