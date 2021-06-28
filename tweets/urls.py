from django.urls import path
from .views import tweet_detail_view,home_view,tweet_list_view

urlpatterns = [
    path('/home',home_view),
    path('',tweet_list_view),
    path('detail/<str:tweet_id>', tweet_detail_view)
]
