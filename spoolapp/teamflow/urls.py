from teamflow import views
import templates
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                  
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('team.html', views.app, name='app'),
]