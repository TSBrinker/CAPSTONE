# Generated by Django 4.0.4 on 2022-12-07 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0002_rename_user_bill_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bill',
            old_name='user_id',
            new_name='user',
        ),
    ]
