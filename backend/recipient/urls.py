from django.urls import path

from .views import ListCreateRecipientView, RetrieveUpdateDestroyRecipientView

urlpatterns = [
    path('', ListCreateRecipientView.as_view()),
    path('<int:recipient_id>/', RetrieveUpdateDestroyRecipientView.as_view())
    ]

