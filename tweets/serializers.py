from django.db import models
from rest_framework import serializers
from .models import Tweet


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()


    def validate_action(self,value):
        if value not in ["like","unlike","retweet"]:
            raise serializers.ValidationError('This is not a valid action')
        return value


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']

    def validate_content(self,value):
        if len(value) > 240:
            raise serializers.ValidationError('This tweet is too long')
        return value