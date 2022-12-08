from django.urls import path, include
from purchases import views

urlpatterns = [
    # path('all/', views.get_all_payments),
    path('', views.post_purchase),
    path('<int:pk>/', views.update_purchase)
]