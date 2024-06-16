import os
from datetime import timedelta

import environ
from django.core.management.utils import get_random_secret_key

from .settings import *

root = environ.Path(__file__) - 3  # get root of the project

env = environ.Env()
if os.path.exists(os.path.join(root, ".env")):
    environ.Env.read_env(os.path.join(root, ".env"))

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS += [
    "drf_yasg",
    "rest_framework",
    "drf_spectacular",
    "django_typomatic",
    "rest_framework_simplejwt",
]

FRONTEND_MODULES = [
    "api",
    "account",
    "location",
]

INSTALLED_APPS += FRONTEND_MODULES

MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "api/media/"

STATIC_URL = "api/static/"
STATIC_ROOT = BASE_DIR / "static"

LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Europe/Moscow"

SECRET_KEY = env.str("DJANGO_SECRET_KEY", default=get_random_secret_key())
DEBUG = env.bool("DEBUG", default=True)
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["*"])

PROJECT_NAME = env.str("PROJECT_NAME", default="Some project")
PROJECT_DESCRIPTION = env.str("PROJECT_DESCRIPTION", default="Project Description")
API_INFO = {
    "title": f"{PROJECT_NAME} API",
    "description": f"API for {PROJECT_DESCRIPTION}",
}

MAX_UPLOAD_SIZE = 104857600
DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600
FILE_UPLOAD_MAX_MEMORY_SIZE = 104857600

LOCAL_DATABASE = env.bool("LOCAL_DATABASE", default=True)
if LOCAL_DATABASE:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / Path("db.sqlite3"),
            "USER": env.str("DB_USER", default="user"),
            "PASSWORD": env.str("DB_PASSWORD", default="password"),
        },
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": env.str("DJANGO_DB_ENGINE", default=None),
            "NAME": env.str("DB_NAME", default=None),
            "USER": env.str("DB_USER", default=None),
            "PASSWORD": env.str("DB_PASSWORD", default=None),
            "HOST": env.str("DJANGO_DB_HOST", default=None),
            "PORT": env.int("DJANGO_DB_PORT", default=None),
        },
    }

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "django_app.auth.CsrfExemptSessionAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

SPECTACULAR_SETTINGS = {
    "DISABLE_ERRORS_AND_WARNINGS": True,
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVE_PERMISSIONS": ["api.permissions.RestrictOnProduction"],
    **API_INFO,
}

HOST = env.str("HOST", default="http://localhost:8000")

CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=[])

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = env.list("DJANGO_CORS_ALLOWED_ORIGINS", default=[])

# Chunked Upload
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10240  # higher than the count of fields

DRF_CHUNKED_UPLOAD_EXPIRATION_DELTA = timedelta(days=1)
DRF_CHUNKED_UPLOAD_PATH = os.path.join("svs")
DRF_CHUNKED_UPLOAD_MIN_BYTES = 0
DRF_CHUNKED_UPLOAD_MAX_BYTES = 5 * 1024 * 1024 * 1024  # max size of 5 GB
DRF_CHUNKED_ALLOWED_MIMETYPES = ["image/svs"]

# Auth JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=2),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}
