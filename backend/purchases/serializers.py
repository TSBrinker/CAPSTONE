from rest_framework import serializers
from .models import Purchase

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'date', 'product', 'user']
        depth = 1