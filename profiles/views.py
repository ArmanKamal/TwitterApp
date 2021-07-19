from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer



# Create your views here.
@permission_classes([IsAuthenticated])
class UserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self,request):
        user = request.user
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data,status=200)

class UpdateUserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def put(self,request):
        user = request.user
        serializer = UserSerializerWithToken(user,many=False)
        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']

        if data['password'] != '':
            user.password = make_password(data['password'])
        user.save()
        return Response(serializer.data,status=200)