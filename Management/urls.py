from .views import *
from rest_framework import routers
from django.urls import path

router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')
router.register('question', QuestionViewSet, basename='question')
router.register('subject', SubjectViewSet, basename='subject')
router.register('choice', ChoiceViewSet, basename='choice')
router.register('scores', ScoresViewSet, basename='score')
router.register('titles', TitleViewSet, basename='title')
router.register('assignments', AssignmentViewSet, basename='assignments')
router.register('profile', ProfileViewSet, basename='profile')

urlpatterns = router.urls


urlpatterns += [
    path('title/create', create_title, name='title'),
    path('title/<int:pk>/', get_title, name='title'),
    path('questions/<int:pk>/', get_questions, name='questions'),
    path('score', create_scores, name='scores_create'),
    path('reports', create_report, name='report'),
    path('contacts', send_message, name='contacts'),
]
