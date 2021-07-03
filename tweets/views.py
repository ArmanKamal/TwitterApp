
from re import A
from rest_framework import serializers
from rest_framework.response import Response
from tweets.forms import TweetForm
from django.shortcuts import render,redirect
from django.conf import settings
from django.http import JsonResponse
from .serializers import TweetSerializer
from rest_framework.views import APIView

from .models import Tweet

def home_view(request):
    context = {

    }
    return render(request,"pages/home.html",context)

def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [{"id":x.id,"content":x.content} for x in qs]
    data = {
        "response":tweet_list
    }
    return JsonResponse(data)

class TweetCreateView(APIView):
    def post(self,request):
        serializer = TweetSerializer(data = request.POST)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response({},status=400)


class TweetListView(APIView):
    def get(self,request):
        qs = Tweet.objects.all()
        serializer = TweetSerializer(qs,many=True)
        return Response(serializer.data,status=200)


class TweetDetailView(APIView):
    def get(self,request,tweet_id):
        list = Tweet.objects.filter(id=tweet_id)
        if not list.exists():
            return Response({},status=404)
        obj = list.first()
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)

def tweet_create_view(request):
    
    context = {

    }
    if request.method =="POST":
        form = TweetForm(request.POST or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            form = TweetForm()
        return redirect('/tweets/home')
    return render(request,"pages/home.html",context)
        

def  tweet_detail_view(request, tweet_id):
    data = {
        "id":tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data,status=status) 

