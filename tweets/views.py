from rest_framework import permissions
from rest_framework.response import Response

from .serializers import TweetSerializer
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Tweet


### Api for Creating Tweets ###

@permission_classes([IsAuthenticated])
class TweetCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self,request):
        serializer = TweetSerializer(data = request.POST)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response({},status=400)

### Api for List of Tweets ###
class TweetListView(APIView):
    def get(self,request):
        qs = Tweet.objects.all()
        serializer = TweetSerializer(qs,many=True)
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
        


