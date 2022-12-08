from django.urls import path, include
from payments import views

urlpatterns = [
    path('', views.bill_payments),
    path('mine/', views.get_user_payments),
    path('update/<int:pk>/', views.update_payment)
]