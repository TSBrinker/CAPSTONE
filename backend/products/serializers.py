from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'owner', 'secondary_users', 'category', 'name', 'brand', 'description', 'stock_level', 'household', 'is_household']