from django.urls import path, include
from payments import views

urlpatterns = [
    path('all/', views.get_all_payments),
    path('', views.post_payments),
    path('update/<int:pk>/', views.update_payment)
]