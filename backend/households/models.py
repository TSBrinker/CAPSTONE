from django.db import models

# Create your models here.

class Household(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    zip = models.CharField(max_length=10)
    open_invite = models.BooleanField(default=False)