from django.urls import path, include
from products import views

urlpatterns = [
    path('', views.get_products),
    path('<int:pk>/', views.update_product)
]