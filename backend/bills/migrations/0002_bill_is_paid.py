# Generated by Django 4.0.4 on 2022-12-15 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
    ]
