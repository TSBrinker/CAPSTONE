from django.urls import path, include
from payments import views

urlpatterns = [
    path('', views.user_payments)
]