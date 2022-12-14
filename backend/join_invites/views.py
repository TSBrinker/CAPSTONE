from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import JoinInvite
from .serializers import JoinInviteSerializer
from django.shortcuts import get_object_or_404
from households.models import Household
from households.serializers import HouseholdSerializer
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

        if request.method == 'POST':
            serializer = JoinInviteSerializer(data=request.data)
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
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['PATCH', 'DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def handle_invite(request, inv_no):
    invite = get_object_or_404(JoinInvite, invite_number=inv_no)
    user = get_object_or_404(User, pk=request.user.id)
    # household = get_object_or_404(Household, pk=invite.household)
    if request.method == 'PATCH':
        serializer = RegistrationSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(household_id=invite.household_id, is_admin=False)
        invite.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        invite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'GET':
        serializer = JoinInviteSerializer(invite)
        return Response(serializer.data)


