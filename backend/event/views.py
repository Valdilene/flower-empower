from django.http import JsonResponse, HttpResponseNotFound

from django.utils.dateparse import parse_date
import json

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from recipient.models import Recipient
from .models import Event

from project import settings
from .serializers import EventSerializer


def create_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        date = parse_date(data.get('date'))
        bouquet_makers_needed = data.get('bouquet_makers_needed')
        drivers_needed = data.get('drivers_needed')
        group = data.get('group')
        closed = data.get('closed', False)

        event = Event.objects.create(
            date=date,
            bouquet_makers_needed=bouquet_makers_needed,
            drivers_needed=drivers_needed,
            group=group,
            closed=closed
        )

        bouquet_makers_ids = data.get('bouquet_makers', [])
        bouquet_makers = settings.AUTH_USER_MODEL.objects.filter(id__in=bouquet_makers_ids)
        event.bouquet_makers.add(*bouquet_makers)

        drivers_ids = data.get('drivers', [])
        drivers = settings.AUTH_USER_MODEL.objects.filter(id__in=drivers_ids)
        event.drivers.add(*drivers)

        recipients_ids = data.get('recipients', [])
        recipients = Recipient.objects.filter(id__in=recipients_ids)
        event.recipients.add(*recipients)

        return JsonResponse({'message': 'Event created successfully'}, status=201)

    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)


class CreateUpdateDeleteEventView(GenericAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        date = parse_date(data.get('date'))
        bouquet_makers_needed = data.get('bouquet_makers_needed')
        drivers_needed = data.get('drivers_needed')
        group = data.get('group')
        closed = data.get('closed', False)

        event = Event.objects.create(
            date=date,
            bouquet_makers_needed=bouquet_makers_needed,
            drivers_needed=drivers_needed,
            group=group,
            closed=closed
        )

        bouquet_makers_ids = data.get('bouquet_makers', [])
        bouquet_makers = settings.AUTH_USER_MODEL.objects.filter(id__in=bouquet_makers_ids)
        event.bouquet_makers.add(*bouquet_makers)

        drivers_ids = data.get('drivers', [])
        drivers = settings.AUTH_USER_MODEL.objects.filter(id__in=drivers_ids)
        event.drivers.add(*drivers)

        recipients_ids = data.get('recipients', [])
        recipients = Recipient.objects.filter(id__in=recipients_ids)
        event.recipients.add(*recipients)

        return Response({'message': 'Event created successfully'}, status=status.HTTP_201_CREATED)
    def get(self, request, *args, **kwargs):
        viewEvent = self.get_object()
        serializer = EventSerializer(viewEvent)
        return Response(serializer.data)



    def delete(self, request, *args, **kwargs):
        snippet = self.get_object()
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SnippetDetail(GenericAPIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    queryset = Snippet
    serializer_class = SnippetSerializer
    permission_classes = [IsObjectAuthorOrReadOnly]




