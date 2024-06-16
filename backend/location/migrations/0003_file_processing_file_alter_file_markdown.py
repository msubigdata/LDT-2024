# Generated by Django 4.2.13 on 2024-06-16 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0002_file_markdown'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='processing_file',
            field=models.FileField(blank=True, null=True, upload_to='file/', verbose_name='Обработанный файл'),
        ),
        migrations.AlterField(
            model_name='file',
            name='markdown',
            field=models.JSONField(blank=True, default={}, null=True, verbose_name='Markdown'),
        ),
    ]