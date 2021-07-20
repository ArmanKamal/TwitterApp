from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
# Create your models here.

class FollowerRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255,null=True, blank=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)
    bio = models.TextField(blank=True, null=True)
    birthdate = models.DateField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def user_profile_created(sender, instance, created, *args, **kwargs):
    Profile.objects.get_or_create(user=instance)
    if created:
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_profile_created, sender=User)