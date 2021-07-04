from django.db import models
from django.conf import settings
from django.db.models.fields.related import ManyToManyField
from django.utils.functional import lazy


User = settings.AUTH_USER_MODEL
# Create your models here.


class TweetLike(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    user = models.ForeignKey(User,null=True,on_delete=models.CASCADE)
    content = models.TextField(null=True,blank=True)
    image = models.ImageField(null=True,blank=True,upload_to="images/")
    likers = ManyToManyField(User,related_name='tweet_user',blank=True,through=TweetLike)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

