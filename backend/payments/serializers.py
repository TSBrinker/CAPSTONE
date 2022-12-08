from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'bill', 'user', 'payment_date', 'amount', 'confirmation', 'notes']
        depth = 1