from django.http import JsonResponse, HttpResponseNotFound

from django.utils.dateparse import parse_date
import json

from recipient.models import Recipient
from .models import Event

from project import settings


def CreateEvent(request):
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


def delete_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return HttpResponseNotFound('Event not found')

    if request.method == 'DELETE':
        event.delete()
        return JsonResponse({'message': 'Event deleted'})

    return JsonResponse({'error'}, status=405)