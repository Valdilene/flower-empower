from django.urls import path
from . import views

urlpatterns = [
    path('events/update/<int:event_id>/', views.update_event, name='update_event'),
    path('events/delete/<int:event_id>/', views.delete_event, name='delete_event'),

]
