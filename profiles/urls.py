from .views import profile_detail_api_view,ProfileListView
from django.urls import path
urlpatterns = [
    path('public_profile/<str:username>',profile_detail_api_view,name="user-public-profile"),
    path('public_profiles/',ProfileListView.as_view(),name="other-public-profiles"),
]
 
