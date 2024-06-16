FROM python:3.10.6-slim-buster

WORKDIR /app/

ENV PYTHONFAULTHANDLER=1 \
  PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100

RUN apt update
RUN apt install -y libpq-dev gcc python3-dev

RUN pip install poetry

COPY pyproject.toml .

RUN poetry config virtualenvs.create false
RUN poetry install --no-root

COPY . .
RUN runner/django_collect_static.sh

ENTRYPOINT "./runner/runner.sh"
