# Create your views here.
from rest_framework import generics

from location.models import Camera, File, Location
from location.serializers import CameraSerializer, FileSerializer, LocationSerializer


class LocationListView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    http_method_names = ("get", "post", "patch", "delete")


class CameraListView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = CameraSerializer
    queryset = Camera.objects.all()
    http_method_names = ("get", "post", "patch", "delete")


class FileListView(generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    http_method_names = ("get", "post", "patch", "delete")
