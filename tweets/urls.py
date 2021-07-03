from django.urls import path
from .views import tweet_detail_view,home_view,TweetListView,TweetCreateView,TweetDetailView

urlpatterns = [
    path('home',home_view),
    path('',TweetListView.as_view()),
    path('create',TweetCreateView.as_view(),name="tweet_create"),
    path('detail/<str:tweet_id>', TweetDetailView.as_view(),name="tweet_detail")
]
