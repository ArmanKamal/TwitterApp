from tweets.views import MyTokenObtainPairView,UserProfile,RegisterView,UpdateUserProfile
from django.urls import path
urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',UserProfile.as_view(),name="user-profile"),
    path('profile/update/',UpdateUserProfile.as_view(),name="user-profile-update"),
    path('register/',RegisterView,name="register"),
]
 
