# Generated by Django 3.0.7 on 2020-06-28 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0003_auto_20200629_0119'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='choice',
            name='answer_text',
        ),
        migrations.AddField(
            model_name='question',
            name='answer_text',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
