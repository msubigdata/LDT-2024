from django.urls import include, path
from django.views.generic import RedirectView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from .base import urlpatterns as base_url_patterns
from .views import SpectacularElementsView

urlpatterns = [
    path("", RedirectView.as_view(url="elements/")),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "elements/", SpectacularElementsView.as_view(url_name="schema"), name="elements"
    ),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path(
        "swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"
    ),
    path("auth/", include("account.urls"), name="auth"),
    path("location/", include("location.urls"), name="location"),
]

urlpatterns += base_url_patterns
