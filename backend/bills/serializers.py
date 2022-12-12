from rest_framework import serializers
from .models import Bill

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ['id', 'name', 'amount', 'payee', 'due_date', 'description', 'is_split', 'creation_date', 'owner', 'users']
        # depth = 1