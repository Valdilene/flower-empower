from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from user.serializers import UserSerializer
from .permissions import IsAuthenticatedOrAdminUser

User = get_user_model()


class MeView(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrAdminUser]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        if user is not None:
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListCreateUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class RetrieveUpdateDestroyUserView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = "user_id"
    permission_classes = [IsAdminUser]
