from django.utils.deprecation import MiddlewareMixin
from django.http import Http404, HttpResponseForbidden
from django.shortcuts import reverse


class RestrictAdminMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith(reverse('admin:index')):
            if request.user.is_authenticated:
                if not request.user.is_staff:
                    raise Http404
            else:
                raise Http404
