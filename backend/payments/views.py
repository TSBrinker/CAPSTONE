from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Payment
from .serializers import PaymentSerializer
from django.shortcuts import get_object_or_404
from bills.models import Bill
from bills.serializers import BillSerializer

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def bill_payments(request, bpk):
    if request.method == 'POST':
        data=request.data
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            bill = get_object_or_404(Bill, pk=bpk)
            all_payments = Payment.objects.filter(bill_id=bpk)
            print(f"all_payments: {all_payments}")
            # print(f"request.data__amount: data["amount"]")
            payment_total = float(data["amount"])
            print(f"initial payment_total (that is to say, the amount in the request?): {payment_total}")
            for payment in all_payments:
                print(f"payment.amount: {payment.amount}")
                payment_total += float(payment.amount)
                print(f"payment_total: {payment_total}")
            
            if payment_total >= bill.amount:
                serializer2 = BillSerializer(bill, data=request.data, partial=True)
                if serializer2.is_valid():
                    print("ya paid it off!")
                    serializer2.save(is_paid=True, amount=bill.amount)
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