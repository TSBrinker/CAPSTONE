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
def bill_payments(request, bpk):
    if request.method == 'POST':
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(bill_id=bpk, user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        payments = Payment.objects.filter(bill_id=bpk)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_payments(request):
    payments = Payment.objects.filter(user_id=request.user.id)
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_payment(request, pk):
    payment = get_object_or_404(Payment, pk=pk)
    if payment.user.id == request.user.id:
        if request.method == 'PUT':
            serializer = PaymentSerializer(payment, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            payment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)