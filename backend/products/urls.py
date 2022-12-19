from django.urls import path, include
from products import views

urlpatterns = [
    path('', views.get_products),
    path('<int:pk>/', views.update_product),
    path('<int:pk>/update/<int:stock_level>/', views.set_stock_level),
    path('<int:ppk>/purchases/', include('purchases.urls')),
]