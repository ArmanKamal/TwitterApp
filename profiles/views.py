from tweets import serializers
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import PublicProfileSerializer,PublicProfileListSerializer



@api_view(['GET', 'POST'])

def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        me = request.user
        action = data.get("action")
        if profile_obj.user != me:
            if action == "follow":
                profile_obj.followers.add(me)
            elif action == "unfollow":
                profile_obj.followers.remove(me)
            else:
                pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)



@permission_classes([IsAuthenticated])
class ProfileListView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    def get(self,request):
        qs = Profile.objects.exclude(user = request.user)
        serializers = PublicProfileSerializer(qs,many=True)
        return Response(serializers.data, status=200)
