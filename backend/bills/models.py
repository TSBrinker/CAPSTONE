from django.db import models
from authentication.models import User

# Create your models here.

class Bill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payee = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    due_date = models.DateField()
    description = models.CharField(max_length=200)

