from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(UserManager):
    def get_by_natural_key(self, email):
        custom_email_field = '{}__exact'.format(self.model.EMAIL_FIELD)
        return self.get(**{custom_email_field: email})


class User(AbstractUser):
    email = models.EmailField('Email Address', unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    last_login = models.DateTimeField(auto_now_add=True)
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    slug = models.SlugField(blank=True, null=True)

    objects = CustomUser()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        self.slug = self.first_name
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.email


class Subject(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Title(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='subjects')
    title_text = models.CharField(max_length=500)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title_text}({self.subject.name})'


class Question(models.Model):
    title = models.ForeignKey(Title, on_delete=models.CASCADE, related_name='titles')
    question_text = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    answer_text = models.CharField(max_length=500, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title.title_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='questions')
    choice_text = models.CharField(max_length=500, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question.title.title_text


class Score(models.Model):
    score = models.PositiveSmallIntegerField(default=0)
    subject_title = models.CharField(max_length=150, blank=True, null=True)
    topic = models.CharField(max_length=150, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class Assignment(models.Model):
    subject = models.CharField(max_length=200, blank=True, null=True)
    topic = models.CharField(max_length=200, blank=True, null=True)
    assignment_question = models.TextField()
    assignment_score = models.PositiveSmallIntegerField(default=0)
    assignment_solution = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_submitted = models.BooleanField(default=False)

    def __str__(self):
        return self.subject


class Report(models.Model):
    teacher_name = models.CharField(max_length=200, blank=True, null=True)
    student_name = models.CharField(max_length=200, blank=True, null=True)
    report_text = models.TextField()
    subject = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.teacher_name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    thumbnail = models.ImageField(upload_to='profilePhoto/', blank=True, null=True)

    def __str__(self):
        return self.user.email


class Contact(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(max_length=200, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return self.name


@receiver(post_save, sender=User)
def create_profile(instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(instance, *args, **kwargs):
    instance.profile.save()