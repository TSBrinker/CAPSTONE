from rest_framework import serializers
from .models import JoinInvite

class JoinInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinInvite
        fields = ['id', 'invite_number', 'household']
        depth = 1