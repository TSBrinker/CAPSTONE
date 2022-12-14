# Generated by Django 4.0.4 on 2022-12-14 03:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('households', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JoinInvite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invite_number', models.IntegerField()),
                ('is_approved', models.BooleanField(default=False)),
                ('household', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='households.household')),
            ],
        ),
    ]