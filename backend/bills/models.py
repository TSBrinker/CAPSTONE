from django.db import models
from authentication.models import User

# Create your models here.

class Bill(models.Model):
    users = models.ManyToManyField(User) 
    secondary_users = models.ManyToManyField(User, blank=True, default=None, related_name="bill_secondaries") 
    payee = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    due_date = models.DateField()
    description = models.CharField(max_length=200)
    is_split = models.BooleanField(default=False)

