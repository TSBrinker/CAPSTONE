from django.urls import path, include
from purchases import views

urlpatterns = [
    # path('all/', views.get_all_payments),
    path('', views.post_purchase),
    path('<int:pk>/', views.update_purchase),
    path('mine/', views.get_user_purchases),
    path('view/', views.get_product_purchases)
]