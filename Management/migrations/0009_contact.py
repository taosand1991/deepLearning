# Generated by Django 3.0.7 on 2020-07-07 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0008_auto_20200706_1311'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(blank=True, max_length=200, null=True)),
                ('message', models.TextField()),
            ],
        ),
    ]
