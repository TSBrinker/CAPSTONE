from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Payment
from .serializers import PaymentSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def users_bill_payments(request, bpk):
    if request.method == 'POST':
        serializer = Payment(data=request.data)
        if serializer.is_valid():
            serializer.save(bill__id=bpk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        payments = Payment.objects.filter(user=request.user.id)
        payments = payments.filter(bill__id=bpk)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def all_bill_payments(request, bpk):
    if request.method == 'GET':
        payments = Payment.objects.filter(bill__id=bpk)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)