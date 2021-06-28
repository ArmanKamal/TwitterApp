from django.urls import path
from .views import tweet_detail_view,home_view,tweet_list_view,tweet_create_view

urlpatterns = [
    path('home',home_view),
    path('',tweet_list_view),
    path('create',tweet_create_view,name="create_tweet"),
    path('detail/<str:tweet_id>', tweet_detail_view)
]
