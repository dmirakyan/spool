"""spoolapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from teamflow import views
import templates

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                  
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()                    
router.register(r'team', views.TeamView, 'team')     


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  
    path('', views.landing, name='landing'),
    path('test-landing', views.landingTest, name='landing'),


    path('thanks',views.thanks, name='thanks'),
    path('docs/privacy-policy.html',views.privacyPolicy, name='privacy-policy'),
    path('docs/terms-and-conditions.html',views.termsConditions, name='terms-and-conditions'),

    path('app/',include('teamflow.urls')),
    path('login-test.html',views.loginTest, name='logintest'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
