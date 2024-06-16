from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve as base_serve


def serve(request, **kwargs):
    response = base_serve(request, **kwargs)
    is_attachment = request.GET.get("download")
    if is_attachment:
        disposition = "attachment"
        file_name = request.GET.get("file_name")

        if file_name:
            disposition = f'{disposition};filename="{file_name}"'

        response.headers["Content-Disposition"] = disposition
    return response


urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

urlpatterns += (
    re_path(r"^api/media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
)
urlpatterns += (
    re_path(
        r"^api/static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}
    ),
)

admin.site.site_header = f"{settings.PROJECT_NAME} Administration"
admin.site.site_title = settings.PROJECT_NAME
admin.site.index_title = f"{settings.PROJECT_NAME} Administration"
