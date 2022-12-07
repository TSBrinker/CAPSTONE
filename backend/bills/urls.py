from django.urls import path, include
from bills import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_bills),
    path('<int:pk>/', views.update_bill),
]