from .advanced_settings import env

REDIS = env.str("REDIS_URL", "redis://localhost:6379/")

# Celery settings
CELERY_RESULT_BACKEND = REDIS
CELERY_BROKER_URL = REDIS
CELERY_CACHE_BACKEND = "default"
CELERY_CREATE_MISSING_QUEUES = True
