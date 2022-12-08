from django.db import models
from authentication.models import User
from products.models import Product
import datetime

# Create your models here.
class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today)
    quantity = models.IntegerField(default=1)