from django.db import models

from project import settings
from recipient.models import Recipient


class Event(models.Model):
    date = models.DateField()
    bouquet_makers_needed = models.IntegerField()
    drivers_needed = models.IntegerField()
    group = models.IntegerField()
    closed = models.BooleanField(default=False)

    bouquet_makers = models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True, related_name="bouquet_makers")
    drivers = models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True, related_name="drivers")
    recipients = models.ManyToManyField(to=Recipient, blank=True, related_name="recipients")
