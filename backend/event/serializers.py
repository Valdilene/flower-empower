# from django.utils.dateparse import parse_date
from rest_framework import serializers

from user.serializers import UserSerializer
from recipient.serializers import RecipientSerializer
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventAdminSerializer(serializers.ModelSerializer):
    drivers = UserSerializer(many=True, read_only=True)
    bouquet_makers = UserSerializer(many=True, read_only=True)
    # recipients = RecipientSerializer(many=True, read_only=True)
    recipients_count = serializers.SerializerMethodField()

    def get_recipients_count(self, obj):
        return obj.recipients.count()

    class Meta:
        model = Event
        fields = ['id', 'drivers', 'bouquet_makers', 'recipients_count', 'date', 'bouquet_makers_needed', 'drivers_needed','closed']

# def validate_date(self, value):
#     parsed_date = parse_date(value)
#     if not parsed_date:
#         raise serializers.ValidationError("Invalid date format. Use DD/MM/YYYY.")
#     return parsed_date
#
# def to_representation(self, instance):
#     representation = super().to_representation(instance)
#     if instance.date:
#         representation['date'] = instance.date.strftime('%D/%m/%y')
#     return representation
