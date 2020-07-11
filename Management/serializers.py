from rest_framework import serializers
from .models import *
from rest_framework_jwt.settings import api_settings
from rest_auth.serializers import PasswordResetSerializer

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'phone_number', 'thumbnail', 'user'
        ]


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_style': 'password'}, write_only=True)
    token = serializers.SerializerMethodField()
    profile = ProfileSerializer(read_only=True)
    slug = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'id', 'slug', 'first_name', 'last_name', 'token', 'email', 'password', 'password2',
            'is_student', 'is_teacher', 'profile'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(email=validated_data['email'],
                    first_name=validated_data['first_name'],
                    last_name=validated_data['last_name']
                    )
        password = validated_data['password']
        password2 = validated_data['password2']
        student = validated_data['is_student']
        if password != password2:
            return serializers.ValidationError({"password": "password does not match"})
        user.set_password(validated_data['password'])
        if student:
            user.is_student = True
        else:
            user.is_teacher = True
        user.save()
        return user

    def get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token


class TitleSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()

    class Meta:
        model = Title
        fields = [
            'id', 'title_text', 'date_added', 'subject'
        ]


class SubjectSerializer(serializers.ModelSerializer):
    titles = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            'id', 'name', 'date_added', 'titles'
        ]

    def get_titles(self, obj):
        return TitleSerializer(obj.subjects.all(), many=True).data


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = [
            'id', 'question', 'choice_text', 'date_added'
        ]


class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'id', 'question_text', 'choices', 'answer_text', 'title', 'date_added', 'user'
        ]

    def get_choices(self, obj):
        return ChoiceSerializer(obj.questions.all(), many=True).data


class ScoresSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Score
        fields = [
            'id', 'user', 'score', 'subject_title', 'topic'
        ]


class AssignmentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Assignment
        fields = [
            'id', 'subject', 'topic', 'assignment_question', 'assignment_score',
            'assignment_solution', 'user', 'is_submitted'
        ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'



class CustomPasswordResetSerializer(PasswordResetSerializer):

    def get_email_options(self):
        return {
            'html_email_template_name': 'registration/password_reset_email.html',
        }

