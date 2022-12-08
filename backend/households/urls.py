from django.urls import path, include
from households import views


urlpatterns = [
    path('', views.user_household),
    path('all/', views.get_all_households),
    path('<int:pk>/', views.update_household),
]