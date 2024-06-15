import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_app.settings")

app = Celery("django_app")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.task_default_queue = "base"

app.autodiscover_tasks()
