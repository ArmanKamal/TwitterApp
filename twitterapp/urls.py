from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/',include('tweets.urls.user_urls')),
    path('api/',include('profiles.urls')),
    path('api/tweets/',include('tweets.urls.tweet_urls')),
    path('',TemplateView.as_view(template_name='index.html'))
]

