from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import JoinRequest
from .serializers import JoinRequestSerializer
from django.shortcuts import get_object_or_404
from households.models import Household

# Create your views here.

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def household_requests(request, hpk):
    household = get_object_or_404(Household, pk=hpk)
    if request.method == 'POST':
        serializer = JoinRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, household=household)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        if request.user.household == household and request.user.is_admin:
            requests = JoinRequest.objects.filter(household=hpk)
            serializer = JoinRequestSerializer(requests, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
