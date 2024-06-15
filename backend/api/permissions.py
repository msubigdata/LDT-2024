from django.conf import settings
from rest_framework.permissions import BasePermission


class RestrictOnProduction(BasePermission):
    def has_permission(self, request, view):
        return bool(settings.DEBUG)
