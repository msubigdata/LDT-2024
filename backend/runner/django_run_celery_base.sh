#!/bin/bash

python3 manage.py makemigrations
python3 manage.py migrate

celery -A django_app worker -E -l INFO -Q base