# Generated by Django 4.0.4 on 2022-12-14 04:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_admin_flag',
            new_name='is_admin',
        ),
    ]
