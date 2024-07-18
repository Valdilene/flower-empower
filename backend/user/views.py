from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from user.serializers import UserSerializer


class MeView(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = []

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        if user is not None:
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
