from django.db import models
from authentication.models import User

# Create your models here.

class Product(models.Model):
    users = models.ManyToManyField(User)
    # category = models.ForeignKey(Category)
    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=200, null=True)
