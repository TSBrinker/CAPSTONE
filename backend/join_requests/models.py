from django.db import models
from authentication.models import User
from households.models import Household

# Create your models here.

class JoinRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    household = models.ForeignKey(Household, on_delete=models.CASCADE)
