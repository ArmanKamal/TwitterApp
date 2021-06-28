from django.db import models

# Create your models here.
class Tweet(models.Model):
    content = models.TextField(null=True,blank=True)
    image = models.ImageField(null=True,blank=True,upload_to="images/")
    