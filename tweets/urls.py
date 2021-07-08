from django.urls import path
from .views import TweetListView,TweetCreateView,TweetDetailView,TweetDeleteView,TweetActionView

urlpatterns = [

    path('',TweetListView.as_view()),
    path('create/',TweetCreateView.as_view(),name="tweet_create"),
    path('<int:tweet_id>/', TweetDetailView.as_view(),name="tweet_detail"),
    path('<int:tweet_id>/delete/',TweetDeleteView.as_view(),name="tweet_delete"),
    path('action/',TweetActionView.as_view(),name="tweet_action")

]
