from django.db import models
from django.contrib.auth.models import AbstractUser
from households.models import Household


class User(AbstractUser):
    pass
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    household = models.ForeignKey(Household, default=None, blank=True, null=True, on_delete=models.DO_NOTHING)
    is_admin = models.BooleanField(default=False, blank=True)