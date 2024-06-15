# Create your views here.
from rest_framework import generics

from location.serializers import (
    CameraSerializer,
    FileSerializer,
    LocationSerializer,
)
from location.models import Camera, File, Location


class LocationListView(generics.ListAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class CameraListView(generics.ListAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()


class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
