from rest_framework import generics

from location.models import Camera, File, Location
from location.serializers import CameraSerializer, FileSerializer, LocationSerializer


class LocationLCView(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class LocationRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    http_method_names = ("get", "patch", "delete")


class CameraLCView(generics.ListCreateAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()


class CameraRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()
    http_method_names = ("get", "patch", "delete")


class FileLCView(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()


class FileRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    http_method_names = ("get", "patch", "delete")
