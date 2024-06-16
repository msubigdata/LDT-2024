from drf_chunked_upload.serializers import ChunkedUploadSerializer
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from rest_framework.generics import get_object_or_404

from location.models import Camera, File
from location.upload.models import PHOTO_FORMAT, VIDEO_FORMAT, FileUploadChunked


class FileCreateSerializer(serializers.Serializer):
    class Meta:
        model = File
        fields = "__all__"


class FileUploadChunkedSerializersss(ChunkedUploadSerializer):
    viewname = "upload_details"

    class Meta(ChunkedUploadSerializer.Meta):
        model = FileUploadChunked


class FileUploadChunkedSerializer(ChunkedUploadSerializer):
    upload_file = serializers.JSONField(default={})
    camera = serializers.IntegerField(default=0)
    viewname = "upload_details"

    class Meta(ChunkedUploadSerializer.Meta):
        model = FileUploadChunked

    def create(self, validated_data):
        camera = get_object_or_404(Camera, pk=validated_data.pop("camera"))

        filename = validated_data["filename"]
        extension = filename.split(".")

        if not extension[-1] in VIDEO_FORMAT + PHOTO_FORMAT:
            raise NotFound("This format is not supported")

        content_format = File.TypeContent.PHOTO
        if extension[-1] in VIDEO_FORMAT:
            content_format = File.TypeContent.VIDEO.value

        params = {"title": filename, "content": content_format, "camera": camera}

        validated_data["upload_file"] = File.objects.create(**params)
        return FileUploadChunked.objects.create(**validated_data)
