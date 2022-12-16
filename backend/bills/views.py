from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Bill
from .serializers import BillSerializer
from django.shortcuts import get_object_or_404
from authentication.models import User

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_bills(request):
    if request.method == 'POST':
        data=request.data
        new_bill = Bill.objects.create(owner = request.user, name=data["name"], amount=data["amount"], payee=data["payee"], due_date=data["due_date"], description=data["description"], is_split=data["is_split"], )
        new_bill.save()
        for user in request.data["users"]:
            user_obj = User.objects.get(pk=user)
            new_bill.users.add(user_obj)
        serializer = BillSerializer(new_bill, data)
        if serializer.is_valid():
            serializer.save()

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
    if request.user == bill.owner:
        if request.method == 'PUT':
            bill.users.clear()
            # bill.save()
            for user in request.data["users"]:
                user_obj = User.objects.get(pk=user)
                bill.users.add(user_obj)
            serializer = BillSerializer(bill, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            bill.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)