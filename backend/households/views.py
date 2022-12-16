from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Household
from .serializers import HouseholdSerializer
from django.shortcuts import get_object_or_404
from authentication.models import User
from authentication.serializers import RegistrationSerializer


# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_households(request):
    households = Household.objects.all()
    serializer = HouseholdSerializer(households, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_admin_status(request, pk):
    household = get_object_or_404(Household, pk=pk)
    user = get_object_or_404(User, pk=request.user.id)
    if request.user.household_id == household.id:
        serializer = RegistrationSerializer(user)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_418_IM_A_TEAPOT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_household(request):
    if request.method == 'POST':
        user = request.user
        serializer = HouseholdSerializer(data=request.data)
        print(serializer.initial_data)
        serializer2 = RegistrationSerializer(user, data= request.data, partial=True)
        if serializer.is_valid() and serializer2.is_valid():
            print(request.user.id)
            serializer.save(user=request.user)
            serializer2.save(is_admin=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        user = get_object_or_404(User, pk=request.user.id)
        household = user.household
        serializer = HouseholdSerializer(household)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_household(request, pk):
    household = get_object_or_404(Household, pk=pk)
    if request.method == 'PUT':
        serializer = HouseholdSerializer(household, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        household.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_household_by_id(request, pk):
    user = get_object_or_404(User, pk=request.user.id)
    household = get_object_or_404(Household, pk=pk)
    if household.id == user.household_id:
        serializer = HouseholdSerializer(household)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_housemates(request):
    user=get_object_or_404(User, pk=request.user.id)
    housemates = User.objects.filter(household_id = user.household_id)
    serializer = RegistrationSerializer(housemates, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def add_user_to_household(request, pk):
    household = get_object_or_404(Household, pk=pk)
    household_users = User.objects.filter(household_id=pk)
    if not household_users:
        user = get_object_or_404(User, pk=request.user.id)
        serializer = RegistrationSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(household_id=household, is_admin=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)