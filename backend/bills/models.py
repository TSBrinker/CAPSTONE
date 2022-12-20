from django.db import models
from authentication.models import User
from households.models import Household
import datetime

# Create your models here.

class Bill(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE) 
    household = models.ForeignKey(Household, blank=True, null=True, default=None, on_delete=models.CASCADE)
    name = models.CharField(max_length=30) 
    payee = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    due_date = models.DateField()
    description = models.CharField(max_length=200, null=True, blank=True)
    is_household = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    creation_date = models.DateField(default=datetime.date.today)
    

