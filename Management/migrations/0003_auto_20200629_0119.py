# Generated by Django 3.0.7 on 2020-06-28 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0002_choice_profile_question_score_subject_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choice',
            name='answer_text',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='choice',
            name='choice_text',
            field=models.CharField(max_length=500),
        ),
    ]
