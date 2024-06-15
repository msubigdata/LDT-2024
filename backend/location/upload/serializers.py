from drf_chunked_upload.serializers import ChunkedUploadSerializer
from rest_framework import serializers

from location.models import File
from location.upload.models import FileUploadChunked


class FileCreateSerializer(serializers.Serializer):
    class Meta:
        model = File
        fields = ("image_name", "coloring")


class FileUploadChunkedSerializersss(ChunkedUploadSerializer):
    viewname = "upload_details"

    class Meta(ChunkedUploadSerializer.Meta):
        model = FileUploadChunked


class FileUploadChunkedSerializer(ChunkedUploadSerializer):
    file = serializers.JSONField(default={})
    viewname = "upload_details"

    class Meta(ChunkedUploadSerializer.Meta):
        model = FileUploadChunked

    def create(self, validated_data):
        file_data = validated_data.pop("scan")
        file = File.objects.create(**file_data)
        return FileUploadChunked.objects.create(file=file, **validated_data)
