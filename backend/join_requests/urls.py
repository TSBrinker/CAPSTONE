from django.urls import path
from join_requests import views

urlpatterns = [
    path('', views.household_requests),
    path('<int:pk>/', views.handle_request),

]