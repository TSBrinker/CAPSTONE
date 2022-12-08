from django.urls import path, include
from payments import views

urlpatterns = [
    path('mine/', views.users_bill_payments),
    path('all/', views.users_bill_payments),
    # path('user/', views.user_payments)
]