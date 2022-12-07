# Generated by Django 4.0.4 on 2022-12-07 17:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bills', '0003_rename_user_id_bill_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='user',
        ),
        migrations.AddField(
            model_name='bill',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
