from rest_framework import serializers
from .models import Bill

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'users', 'secondary_users', 'amount', 'payee', 'due_date', 'description', 'is_split']