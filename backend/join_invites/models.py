from django.db import models
from authentication.models import User
from households.models import Household

# Create your models here.

class JoinInvite(models.Model):
    invite_number = models.CharField(max_length=8, null=True)
    household = models.ForeignKey(Household, on_delete=models.CASCADE)