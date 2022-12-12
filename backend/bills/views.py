from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Bill
from .serializers import BillSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_bills(request):
    if request.method == 'POST':
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner = request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        billsIMade = Bill.objects.filter(owner_id=request.user.id)
        billsIReceived =  Bill.objects.filter(users__id=request.user.id)
        bills = billsIMade.union(billsIReceived)
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_bill(request, pk):
    bill = get_object_or_404(Bill, pk=pk)
    if request.user in bill.users.all():
        if request.method == 'PUT':
            serializer = BillSerializer(bill, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            bill.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)