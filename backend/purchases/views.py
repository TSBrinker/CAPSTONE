from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Purchase
from .serializers import PurchaseSerializer
from django.shortcuts import get_object_or_404
from products.models import Product
from products.serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_purchases(request):
    if request.method == 'GET':
        purchases = Purchase.objects.filter(user_id=request.user.id)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_product_purchases(request, ppk):

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def product_purchases(request, ppk):
    if request.method == 'GET':
        purchases = Purchase.objects.filter(product_id=ppk)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        product = Product.objects.get(pk=ppk)
        serializer = PurchaseSerializer(data=request.data)
        serializer2 = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid() & serializer2.is_valid():
            serializer.save(product=product, user_id=request.user.id)
            serializer2.save(stock_level=3)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_purchase(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk)
    if purchase.user.id == request.user.id:
        if request.method == 'PUT':
            serializer = PurchaseSerializer(purchase, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            purchase.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)