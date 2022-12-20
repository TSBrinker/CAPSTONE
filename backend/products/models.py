from django.db import models
from authentication.models import User
from categories.models import Category
from households.models import Household

# Create your models here.

class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    secondary_users = models.ManyToManyField(User, blank=True, default=None, related_name="product_secondaries")
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    stock_level = models.PositiveIntegerField(default=3)
    is_household = models.BooleanField(default=False)
    household = models.ForeignKey(Household, default=None, blank=True, null=True, on_delete=models.SET_NULL)   