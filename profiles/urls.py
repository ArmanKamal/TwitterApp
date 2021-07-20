from .views import profile_detail_api_view
from django.urls import path
urlpatterns = [
    path('public_profile/<str:username>',profile_detail_api_view,name="user-public-profile"),
]
 
