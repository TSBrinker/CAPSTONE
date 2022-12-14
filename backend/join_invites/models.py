from django.db import models
from authentication.models import User
from households.models import Household

# Create your models here.

class JoinInvite(models.Model):
    invite_number = models.IntegerField()
    household = models.ForeignKey(Household, on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)