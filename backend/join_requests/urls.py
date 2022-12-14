from django.urls import path
from join_requests import views

urlpatterns = [
    path('', views.household_requests),
    path('<int:pk>/approve/', views.approve_request),
    path('<int:pk>/deny/', views.household_requests),

]