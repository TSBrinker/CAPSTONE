# Generated by Django 4.0.4 on 2022-12-09 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('households', '0007_remove_household_admins_remove_household_members_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='household',
            name='address',
            field=models.CharField(default='123 Washington St', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='household',
            name='zip',
            field=models.CharField(default='90210', max_length=5),
            preserve_default=False,
        ),
    ]