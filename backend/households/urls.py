from django.urls import path, include
from households import views


urlpatterns = [
    path('', views.user_household),
    path('housemates/', views.get_housemates),
    path('all/', views.get_all_households),
    path('<int:pk>/', views.update_household),
]