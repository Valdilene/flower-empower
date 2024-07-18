"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from registration.views import RegistrationView, RegistrationValidationView
from event.views import CreateEvent
from user.views import MeView

urlpatterns = [
    path('admin/', admin.site.urls),
    # authentication
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    # registration
    path('api/registration/', RegistrationView.as_view(), name='registration'),
    path('api/registration/validation/', RegistrationValidationView.as_view(), name='registration_validation'),
    # user
    path('api/user/me/', MeView.as_view(), name='user_me'),
    # events
    path('api/event/', include('event.urls')),
    path('api/event/create/', CreateEvent, name='create_event'),
]
