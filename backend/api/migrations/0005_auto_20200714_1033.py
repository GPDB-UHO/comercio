# Generated by Django 3.0.7 on 2020-07-14 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200707_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='distribucion',
            name='bodegas',
            field=models.ManyToManyField(related_name='distribuciones', to='api.Bodega'),
        ),
    ]
