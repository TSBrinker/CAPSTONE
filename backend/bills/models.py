from django.db import models
from authentication.models import User
import datetime

# Create your models here.

class Bill(models.Model):
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING) 
    users = models.ManyToManyField(User, blank=True, default=None, related_name="bill_secondaries")
    name = models.CharField(max_length=30) 
    payee = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    due_date = models.DateField()
    description = models.CharField(max_length=200)
    is_split = models.BooleanField(default=False)
    
    creation_date = models.DateField(default=datetime.date.today)
    

