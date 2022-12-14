from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import JoinInvite
from .serializers import JoinInviteSerializer
from django.shortcuts import get_object_or_404
from households.models import Household
from authentication.serializers import RegistrationSerializer
from authentication.models import User
import random

# Create your views here.

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def household_invites(request, hpk):
    household = get_object_or_404(Household, pk=hpk)
    if request.user.is_admin and request.user.household_id == household.id:
        invite_number = str(random.randint(10000000, 99999999))
        print(f'invite_number: {invite_number}, {type(invite_number)}')
        if request.method == 'POST':
            serializer = JoinInviteSerializer(data=request.data)
            print(serializer.initial_data)
            if serializer.is_valid():
                serializer.save(invite_number=invite_number, household=household)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'GET':
            if request.user.household == household and request.user.is_admin:
                requests = JoinInvite.objects.filter(household=hpk)
                serializer = JoinInviteSerializer(requests, many=True)
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        print("User is not admin OR user's household doesn't match the household in the hpk")
        return Response(status=status.HTTP_403_FORBIDDEN)

