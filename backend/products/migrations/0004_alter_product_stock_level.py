# Generated by Django 4.0.4 on 2022-12-17 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_product_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='stock_level',
            field=models.CharField(default='stocked', max_length=7),
        ),
    ]