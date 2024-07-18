from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateEvent, name='create_event'),
    #path('update/<int:event_id>/', views.update_event, name='update_event'),
    path('delete/<int:event_id>/', views.delete_event, name='delete_event'),

]
