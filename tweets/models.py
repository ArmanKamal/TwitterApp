from django.db import models
from django.conf import settings
from django.utils.functional import lazy


User = settings.AUTH_USER_MODEL
# Create your models here.
class Tweet(models.Model):
    user = models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    content = models.TextField(null=True,blank=True)
    image = models.ImageField(null=True,blank=True,upload_to="images/")
    