from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404
from authentication.models import User
from categories.models import Category

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_products(request):
    if request.method == 'POST':
        data=request.data
        print(request.user)
        category = get_object_or_404(Category, pk = request.data["category"])
        if request.data["is_household"] == True:
            new_product = Product.objects.create(owner = request.user, name=data["name"], category=category, brand=data["brand"], stock_level=2, household=request.user.household)        
        else:
            new_product = Product.objects.create(owner = request.user, name=data["name"], category=category, brand=data["brand"], stock_level=2)        
        new_product.save()
        for user in request.data["users"]:
            user_obj = User.objects.get(pk=user)
            new_product.secondary_users.add(user_obj)
        serializer = ProductSerializer(new_product, data=request.data)
        if serializer.is_valid():
            serializer.save(category=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        products = Product.objects.filter(owner=request.user) | Product.objects.filter(secondary_users__id=request.user.id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    product = get_object_or_404(Product, pk=pk) 
    if request.user in product.users.all():
        if request.method == 'PUT':
            serializer = ProductSerializer(product, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

        