from rest_framework import permissions, serializers
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .serializers import TweetActionSerializer,TweetCreateSerializer,TweetSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Tweet
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User


## Api for User ##
@permission_classes([IsAuthenticated])
class UserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self,request):
        user = request.user
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data,status=200)

@api_view(['POST'])
def RegisterView(request):
    data = request.data
    print(data)
    try:
        user = User.objects.create(
            first_name=data['name'],
            username = data['email'],
            email = data['email'],
            password =make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data,status=201)
    except:
        messages={'detail':'Email already exists'}
        return Response(messages, status=400)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




### Api for Creating Tweets ###

@permission_classes([IsAuthenticated])
class TweetCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self,request):
        serializer = TweetCreateSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response({},status=400)

### Api for List of Tweets ###
class TweetListView(APIView):
    def get(self,request):
        qs = Tweet.objects.all()
        username = request.GET.get('username')
        if username != None:
            qs = qs.filter(user__username__iexact=username)
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

    def delete(self,request,tweet_id):
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
    def post(self,request):
        serializer = TweetActionSerializer(data=request.data)
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
                serializer = TweetSerializer(obj)
                return Response(serializer.data, status=200)

            elif action == "unlike":
                obj.likers.remove(request.user)
                serializer = TweetSerializer(obj)
                return Response(serializer.data, status=200)

            elif action == "retweet":
                parent_obj  = obj
                new_tweet = Tweet.objects.create(user=request.user, parent_tweet=parent_obj,content=content)
                serializer = TweetSerializer(new_tweet)
                return Response(serializer.data, status=201)
        return Response({'Not a valid action'})
