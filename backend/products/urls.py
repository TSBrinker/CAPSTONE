from django.urls import path, include
from products import views

urlpatterns = [
    path('', views.get_products),
    # path('all/', views.get_all_payments),
    # path('update/<int:pk>/', views.update_payment)
]