from profiles.models import Profile
from profiles.serializers import ProfileSerializer
from re import L
from django.db import models
from rest_framework import serializers
from .models import Tweet
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
    

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username','email','name']

    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','username','email','token','name']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        print(serializer)

        for k,v in serializer.items():
            data[k] = v
        return data
