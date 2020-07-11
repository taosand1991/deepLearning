from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False)
    def get_student(self, request):
        queryset = User.objects.filter(is_student=True)
        serializer = UserSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['GET'])
    def get_questions(self, request, pk=None):
        title = get_object_or_404(Title, pk=pk)
        queryset = Question.objects.filter(title__title_text__icontains=title)
        serializer = QuestionSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChoiceViewSet(viewsets.ModelViewSet):
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()

    def perform_create(self, serializer):
        serializer = serializer(user=self.request.user)
        return serializer


@api_view(["GET"])
def get_title(request, pk):
    subjects = get_object_or_404(Subject, pk=pk)
    queryset = Title.objects.filter(subject__name__iexact=subjects)
    serializer = TitleSerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_title(request):
    if request.method == "POST":
        serializer = TitleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_questions(request, pk=None):
    title = get_object_or_404(Title, pk=pk)
    queryset = Question.objects.filter(title=title)
    serializer = QuestionSerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


class TitleViewSet(viewsets.ModelViewSet):
    serializer_class = TitleSerializer
    queryset = Title.objects.all()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_scores(request):
    data = {}
    subject = request.data['subject']
    topic = request.data['title_text']
    score = request.data['totalScore']
    user = request.user
    scores = Score.objects.filter(user=request.user, subject_title=subject)
    if scores.exists():
        data['message'] = 'This result has been saved already. kindly start new test with new question'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        Score.objects.create(
            subject_title=subject,
            topic=topic,
            score=score,
            user=user
        )
    return Response(status=status.HTTP_200_OK)


class ScoresViewSet(viewsets.ModelViewSet):
    serializer_class = ScoresSerializer
    queryset = Score.objects.all()

    @action(detail=False)
    def get_user_score(self, request):
        queryset = Score.objects.filter(user=self.request.user)
        serializer = ScoresSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def get_student_scores(self, request):
        queryset = Score.objects.filter(user__is_student=True)
        serializer = ScoresSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    @action(detail=False)
    def get_user_ass(self, request):
        queryset = Assignment.objects.filter(user=request.user, is_submitted=False).all()
        serializer = AssignmentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def get_submit_ass(self, request):
        queryset = Assignment.objects.filter(is_submitted=True).all()
        serializer = AssignmentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def create_report(request):
    subject = request.data['subject']
    report = request.data['report']
    student = request.data['student']
    teacher = request.data['teacher']

    Report.objects.create(
        subject=subject,
        report_text=report,
        student_name=student,
        teacher_name=teacher
    )
    heading = 'This is a report'
    from_email = settings.EMAIL_HOST_USER
    to_email = [settings.EMAIL_HOST_USER]
    message = f'A report has been made by {teacher}, the name of the student is {student}'
    send_mail(subject=heading, from_email=from_email, recipient_list=to_email,
              message=message, fail_silently=False)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def send_message(request):
    name = request.data['name']
    email = request.data['email']
    message = request.data['message']

    Contact.objects.create(
        name=name,
        email=email,
        message=message
    )
    subject = 'Thank You'
    body = f'Dear {name}, Thank you for contacting us, we will get back to you in 48 hours '
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]
    send_mail(subject=subject, message=body, from_email=from_email,
              recipient_list=to_email, fail_silently=False)

    return Response(status=status.HTTP_200_OK)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()