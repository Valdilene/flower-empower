from random import randint

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from registration.models import Registration
from registration.serializers import RegistrationSerializer, RegistrationValidationSerializer, PasswordResetSerializer, \
    PasswordResetValidationSerializer

User = get_user_model()


class RegistrationView(GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = []

    def post(self, request):
        code = randint(1000, 9999)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        send_mail(
            'Welcome to Flower Empower',
            'Here is your registration code: {}'.format(code),
            'flower.empower.management@gmail.com',
            ['{}'.format(request.data.get('email'))],
            fail_silently=False, )
        serializer.save(code=code)
        return Response(status=status.HTTP_201_CREATED)


class RegistrationValidationView(GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationValidationSerializer
    permission_classes = []

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)


class PasswordResetView(GenericAPIView):
    permission_classes = []
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.send_password_reset_email()
        return Response(status=status.HTTP_200_OK)


class PasswordResetValidationView(GenericAPIView):
    permission_classes = []
    serializer_class = PasswordResetValidationSerializer

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(status=status.HTTP_200_OK)
