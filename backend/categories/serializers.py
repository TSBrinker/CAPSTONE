from rest_framework import serializers
from .models import Category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'user', 'name', 'description']