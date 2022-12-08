from django.db import models
from authentication.models import User

# Create your models here.

class Product(models.Model):
    users = models.ManyToManyField(User)
    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
