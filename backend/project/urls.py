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
from event.views import create_event
from registration.views import RegistrationView, RegistrationValidationView, PasswordResetView, \
    PasswordResetValidationView
from user.views import MeView, ListCreateUserView, RetrieveUpdateDestroyUserView
from recipient.views import ListCreateRecipientView, RetrieveUpdateDestroyRecipientView

urlpatterns = [
    path('admin/', admin.site.urls),
    # authentication
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    # registration
    path('api/registration/', RegistrationView.as_view(), name='registration'),
    path('api/registration/validation/', RegistrationValidationView.as_view(), name='registration_validation'),
    # password forget
    path('api/auth/password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('api/auth/password-reset/validate/', PasswordResetValidationView.as_view(), name='me'),
    # user
    path('api/user/me/', MeView.as_view(), name='user_me'),
    path('api/user/', ListCreateUserView.as_view(), name='list_users'),
    path('api/user/<int:user_id>/', RetrieveUpdateDestroyUserView.as_view(), name='user'),
    # events
    path('api/event/', include('event.urls')),
    path('api/event/create/', create_event, name='create_event'),
    # recipients
    path('api/recipients/', ListCreateRecipientView.as_view(), name='list_recipients'),
    path('api/recipients/<int:recipient_id>/', RetrieveUpdateDestroyRecipientView.as_view(), name='update_recipient'),
]
