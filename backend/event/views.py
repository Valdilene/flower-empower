from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.response import Response
from recipient.models import Recipient
from .models import Event
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import EventSerializer, EventAdminSerializer


# 1
class ListCreateEventView(ListCreateAPIView):
    # View for listing all events and creating a new event.
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]  # Ensure all users must be authenticated

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        return super(ListCreateEventView, self).get_permissions()

    def get_serializer(self, *args, **kwargs):
        if self.request.user.is_superuser:
            serializer_class = EventAdminSerializer
        else:
            serializer_class = EventSerializer

        return serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = request.data
        date = parse_date(data.get('date'))
        bouquet_makers_needed = data.get('bouquet_makers_needed')
        drivers_needed = data.get('drivers_needed')
        group = data.get('group')
        closed = data.get('closed', False)
        user = get_user_model()

        event = Event.objects.create(
            date=date,
            bouquet_makers_needed=bouquet_makers_needed,
            drivers_needed=drivers_needed,
            group=group,
            closed=closed
        )

        bouquet_makers_ids = data.get('bouquet_makers', [])
        bouquet_makers = user.objects.filter(id__in=bouquet_makers_ids)
        event.bouquet_makers.add(*bouquet_makers)

        drivers_ids = data.get('drivers', [])
        drivers = user.objects.filter(id__in=drivers_ids)
        event.drivers.add(*drivers)

        recipients_ids = data.get('recipients', [])
        recipients = Recipient.objects.filter(id__in=recipients_ids)
        event.recipients.add(*recipients)

        return Response({'message': 'Event created successfully'}, status=status.HTTP_201_CREATED)


class EventRetrieveUpdateDestroyView(GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventAdminSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.get_serializer(event)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.get_serializer(event, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        event = self.get_object()
        event.delete()
        return Response({'message': 'Event deleted'}, status=status.HTTP_204_NO_CONTENT)

    def close_event(self, request, *args, **kwargs):
        event = self.get_object()
        event.closed = True
        event.save()
        return Response({'message': 'Event closed'}, status=status.HTTP_200_OK)


class ToggleEventParticipationView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        event_id = self.kwargs.get(self.lookup_field)
        role = request.data.get('role')

        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        if role == 'bouquet_maker':
            if user in event.bouquet_makers.all():
                event.bouquet_makers.remove(user)
                message = 'You have unregistered as a bouquet maker for the event.'
            else:
                if user in event.drivers.all():
                    event.drivers.remove(user)
                event.bouquet_makers.add(user)
                message = 'You have registered as a bouquet maker for the event.'

        elif role == 'driver':
            if user in event.drivers.all():
                event.drivers.remove(user)
                message = 'You have unregistered as a driver for the event.'
            else:
                if user in event.bouquet_makers.all():
                    event.bouquet_makers.remove(user)
                event.drivers.add(user)
                message = 'You have registered as a driver for the event.'

        else:
            return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': message}, status=status.HTTP_200_OK)
