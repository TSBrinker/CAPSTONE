from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Category
from .serializers import CategorySerializer
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    if request.method == 'POST':
        print(request.data)
        data=request.data
        if request.data["is_household"] == True:
            new_category = Category.objects.create(user = request.user, name=data["name"], description=data["description"], household=request.user.household)
        else: 
            new_category = Category.objects.create(user = request.user, name=data["name"], description=data["description"])
        new_category.save()
        serializer = CategorySerializer(new_category, data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        categories = Category.objects.filter(user=request.user.id)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_category(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if category.user.id == request.user.id:
        if category.user.id == request.user.id:
            if request.method == 'PUT':
                serializer = CategorySerializer(category, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data)
            elif request.method == 'DELETE':
                category.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)