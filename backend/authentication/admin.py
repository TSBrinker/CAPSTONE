from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# class CustomUserAdmin(UserAdmin):
#     pass
# UserAdmin.fieldsets += ('Custom fields set', {'fields': ('household_id')})

# Register your models here.
admin.site.register(User, UserAdmin)