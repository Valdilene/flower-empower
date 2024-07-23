# from django.utils.dateparse import parse_date
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventUserSerializer(EventSerializer):
    class Meta:
        model = Event
        fields = ["id", 'date', 'closed']

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
