from drf_chunked_upload.views import ChunkedUploadView
from rest_framework import permissions

from location.upload.models import FileUploadChunked
from location.upload.serializers import (
    FileUploadChunkedSerializer,
    FileUploadChunkedSerializersss,
)


class FileUploadChunkedView(ChunkedUploadView):
    model = FileUploadChunked
    serializer_class = FileUploadChunkedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset()

    def put(self, request, pk=None, *args, **kwargs):
        return super().put(request, pk=pk, *args, **kwargs)

    @property
    def response_serializer_class(self):
        serializer_class = FileUploadChunkedSerializersss
        if self.request is None or self.request.method not in ["PUT", "POST"]:
            serializer_class = FileUploadChunkedSerializersss
        return serializer_class

    def post(self, request, pk=None, *args, **kwargs):
        return super().post(request, pk, *args, **kwargs)
