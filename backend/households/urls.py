from django.urls import path, include
from households import views


urlpatterns = [
    path('', views.user_household),
    path('housemates/', views.get_housemates),
    path('all/', views.get_all_households),
    path('<int:pk>/', views.update_household),
    path('<int:pk>/get/', views.get_household_by_id),
    path('<int:pk>/admin/', views.get_admin_status),
    path('<int:pk>/first_user/', views.add_user_to_household),
    path('<int:hpk>/join_requests/', include('join_requests.urls')),
    path('<int:hpk>/join_invites/', include('join_invites.urls')),
]