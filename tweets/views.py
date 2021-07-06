from rest_framework import permissions, serializers
from rest_framework.response import Response

from .serializers import TweetActionSerializer,TweetCreateSerializer,TweetSerializer
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Tweet


### Api for Creating Tweets ###

@permission_classes([IsAuthenticated])
class TweetCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self,request):
        serializer = TweetCreateSerializer(data = request.POST)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response({},status=400)

### Api for List of Tweets ###
class TweetListView(APIView):
    def get(self,request):
        qs = Tweet.objects.all()
        serializer = TweetSerializer(qs,many=True)
        print(serializer.data)
        return Response(serializer.data,status=200)


### Api for Detail tweet ###

class TweetDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self,request,tweet_id):
        list = Tweet.objects.filter(id=tweet_id)
        if not list.exists():
            return Response({},status=404)
        obj = list.first()
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)

class TweetDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def delete(request,tweet_id,*args,**kwargs):
        tweet_list = Tweet.objects.filter(id=tweet_id)
        if not tweet_list.exists():
            return Response({}, status=404)
        qs = tweet_list.filter(user=request.user)
        if not qs.exists():
            return Response({"message":"You cannot delete this tweet"},status=401)
        obj = qs.first()
        obj.delete()
        return Response({"message":"Tweet was deleted"},status=200)
        


class TweetActionView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self,request,tweet_id):
        serializer = TweetActionSerializer(data=request.POST)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            tweet_id = data.get("id")
            action = data.get("action")
            content = data.get("content")
            tweet_list = Tweet.objects.filter(id=tweet_id)
            if not tweet_list.exists():
                return Response({},status=404)
            obj = tweet_list[0]
            if action == "like":
                obj.likers.add(request.user)

            elif action == "unlike":
                obj.likes.remove(request.user)
            elif action == "retweet":
                parent_obj  = obj
                new_tweet = Tweet.objects.create(user=request.user, parent=parent_obj,content=content)
                
        return Response({"message":"Tweet Liked"},status=200)
