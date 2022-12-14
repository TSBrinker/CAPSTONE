from rest_framework import serializers
from .models import JoinRequest

class JoinRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinRequest
        fields = ['id', 'user', 'household']
        depth = 1