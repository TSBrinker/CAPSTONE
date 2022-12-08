from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Purchase
from .serializers import PurchaseSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_purchase(request, ppk):
    if request.method == 'POST':
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product_id=ppk, user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_payments(request):
    if request.method == 'GET':
        purchases = Purchase.objects.all()
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_purchase(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk)
    if request.method == 'PUT':
        serializer = PurchaseSerializer(purchase, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        purchase.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)