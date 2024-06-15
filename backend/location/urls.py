from django.urls import path

from location.upload.views import FileUploadChunkedView
from location.views import CameraListView, FileListView, LocationListView

urlpatterns = [
    path("location/", LocationListView.as_view(), name="location"),
    path("camera/", CameraListView.as_view(), name="camera"),
    path("file/", FileListView.as_view(), name="file"),
    path("file/upload/", FileUploadChunkedView.as_view(), name="file-upload"),
]
