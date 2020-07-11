from django.contrib import admin
from .models import *


admin.site.register(User)
admin.site.register(Subject)
admin.site.register(Report)
admin.site.register(Assignment)
admin.site.register(Profile)
admin.site.register(Score)
admin.site.register(Contact)


@admin.register(Title)
class TitleAdmin(admin.ModelAdmin):
    list_display = ('title_text', 'subject', 'date_added',)


class ChoiceTabularInline(admin.TabularInline):
    model = Choice


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display_links = ('question_text',)
    list_display = ('question_text', 'title', 'user', 'date_added')
    list_filter = ('user', 'date_added',)
    search_fields = ('user',)
    inlines = [ChoiceTabularInline]
