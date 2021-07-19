from rest_framework import fields, serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = ('__all__')

