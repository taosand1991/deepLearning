# Generated by Django 3.0.7 on 2020-07-03 18:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0005_auto_20200629_1533'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teacher_name', models.CharField(blank=True, max_length=200, null=True)),
                ('student_name', models.CharField(blank=True, max_length=200, null=True)),
                ('report_text', models.TextField()),
                ('subject', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='score',
            name='subject_score',
        ),
        migrations.AddField(
            model_name='score',
            name='subject_title',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='topic',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(blank=True, max_length=200, null=True)),
                ('topic', models.CharField(blank=True, max_length=200, null=True)),
                ('assignment_question', models.TextField()),
                ('assignment_score', models.PositiveSmallIntegerField(default=0)),
                ('is_submitted', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
