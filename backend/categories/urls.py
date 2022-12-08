from django.urls import path, include
from categories import views

urlpatterns = [
    path('', views.get_categories),
    path('<int:pk>/', views.update_category)
]