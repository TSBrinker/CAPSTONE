from django.db import models
from authentication.models import User
from categories.models import Category

# Create your models here.

class Product(models.Model):
    users = models.ManyToManyField(User)
    secondary_users = models.ManyToManyField(User, blank=True, default=None, related_name="secondaries")
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)