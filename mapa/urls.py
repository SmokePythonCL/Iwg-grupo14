from django.urls import path
from . import views

urlpatterns = [
    path('', views.map),
    path('submit/', views.submit),
    path('thanks/', views.thanks)
    ]