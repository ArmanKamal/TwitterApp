from django.db import models
from rest_framework import serializers
from .models import Tweet


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self,value):
        if value not in ["like","unlike","retweet"]:
            raise serializers.ValidationError('This is not a valid action')
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id','content']

    def validate_content(self,value):
        if len(value) > 240:
            raise serializers.ValidationError('This tweet is too long')
        return value


class TweetSerializer(serializers.ModelSerializer):
    likers = serializers.SerializerMethodField(read_only=True)
    parent_tweet = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id','content','likers',"parent_tweet","is_retweet"]

    def get_likers(self,obj):
        return obj.likers.count()
    
