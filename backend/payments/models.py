from django.db import models
from authentication.models import User
from bills.models import Bill
import datetime

# Create your models here.

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Payment(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_date = models.DateField(default=datetime.date.today)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    confirmation = models.CharField(max_length=30, blank=True, null=True)
    notes = models.CharField(max_length=100, blank=True, null=True)