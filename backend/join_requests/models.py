from django.db import models
from authentication.models import User
from households.models import Household

# Create your models here.

user = models.ForeignKey(User, on_delete=models.CASCADE)
household_id = models.ForeignKey(Household, on_delete=models.CASCADE)
is_approved = models.BooleanField(default=False)