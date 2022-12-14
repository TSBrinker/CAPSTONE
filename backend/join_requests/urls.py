from django.urls import path
from join_requests import views

urlpatterns = [
    path('', views.household_requests),

]