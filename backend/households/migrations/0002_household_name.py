# Generated by Django 4.0.4 on 2022-12-06 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('households', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='household',
            name='name',
            field=models.CharField(default='generic household', max_length=30),
            preserve_default=False,
        ),
    ]
