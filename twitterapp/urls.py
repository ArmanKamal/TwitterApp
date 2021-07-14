from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from tweets.views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/tweets/',include('tweets.urls')),
    path('',TemplateView.as_view(template_name='index.html'))
]

