from django.urls import path, include
from categories import views

urlpatterns = [
    path('', views.get_categories),
    path('household/', views.get_household_categories),
    path('<int:pk>/', views.update_category),
    path('<int:pk>/products/', views.get_products_by_category),
]