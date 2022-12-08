from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_products(request):
    if request.method == 'GET':
        products = Product.objects.filter(users__id=request.user.id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
