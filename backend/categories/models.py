from django.db import models
from authentication.models import User

# Create your models here.

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=40, null=True, blank=True)