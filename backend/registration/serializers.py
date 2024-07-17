from django.core.exceptions import ValidationError
from rest_framework import serializers, status
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from registration.models import Registration

User = get_user_model()


def email_does_not_exist(email):
    try:
        User.objects.get(email=email)
        raise ValidationError(message='This email is taken')
    except User.DoesNotExist:
        return email


def email_does_exist(email):
    try:
        Registration.objects.get(email=email)
        return email
    except Registration.DoesNotExist:
        raise ValidationError(message='Registration does not exist!')


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['email']


class RegistrationValidationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_exist])
    code = serializers.CharField(label='Validation code', write_only=True)
    password = serializers.CharField(label='password', write_only=True)
    password_repeat = serializers.CharField(label='password_repeat', write_only=True)
    phone = serializers.CharField(max_length=50)
    address = serializers.CharField(max_length=100)
    city = serializers.CharField(max_length=30)
    state = serializers.CharField(max_length=20)
    zip = serializers.CharField(max_length=10)
    preferred_communication = serializers.CharField(max_length=20)
    available_for_backup = serializers.BooleanField(default=True)

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        reg_profile = Registration.objects.get(email=email)
        if str(reg_profile.code) != code:
            raise ValidationError(message='The code does not belong to this email!')
        if data.get('password') != data.get('password_repeat'):
            raise ValidationError(message='Passwords do not match!')
        return data

    def save(self, validated_data):
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')
        phone = validated_data.get('phone')
        address = validated_data.get('address')
        city = validated_data.get('city')
        state = validated_data.get('state')
        zip = validated_data.get('zip')
        preferred_communication = validated_data.get('preferred_communication')
        available_for_backup = validated_data.get('available_for_backup')
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            address=address,
            city=city,
            state=state,
            zip=zip,
            preferred_communication=preferred_communication,
            available_for_backup=available_for_backup,
            is_superuser=False,
            is_active=True,
        )
        new_user.set_password(validated_data.get('password'))
        new_user.save()
        return Response(status=status.HTTP_201_CREATED)
