from django.urls import path
from join_invites import views

urlpatterns = [
    path('', views.household_invites),
    path('<inv_no>/', views.handle_invite),

]