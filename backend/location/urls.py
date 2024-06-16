from django.urls import path

from location.upload.views import FileUploadChunkedView
from location.views import (
    CameraLCView,
    CameraRUDView,
    FileLCView,
    FileRUDView,
    LocationLCView,
    LocationRUDView,
)

urlpatterns = [
    path("location/<int:pk>/", LocationRUDView.as_view(), name="locations"),
    path("location/", LocationLCView.as_view(), name="location"),
    path("camera/<int:pk>/", CameraRUDView.as_view(), name="cameras"),
    path("camera/", CameraLCView.as_view(), name="camera"),
    path("file/<int:pk>/", FileRUDView.as_view(), name="files"),
    path("file/", FileLCView.as_view(), name="file"),
    path("file/upload/", FileUploadChunkedView.as_view(), name="upload_data"),
    path(
        "file/upload/<str:pk>/", FileUploadChunkedView.as_view(), name="upload_details"
    ),
    path(
        "file/upload/complete/", FileUploadChunkedView.as_view(), name="upload_compete"
    ),
]
