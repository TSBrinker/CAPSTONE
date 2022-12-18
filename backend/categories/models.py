from django.db import models
from authentication.models import User
from households.models import Household


# Create your models here.

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=100, null=True, blank=True)
    household = models.ForeignKey(Household, default=None, blank=True, null=True, on_delete=models.CASCADE)   
    depth=1