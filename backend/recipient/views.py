from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser

from .models import Recipient
from .serializers import RecipientSerializer


class ListCreateRecipientView(ListCreateAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = Recipient.objects.all()
        group = self.request.query_params.get('group', None)
        if group:
            return Recipient.objects.filter(group=group)
        return queryset


class RetrieveUpdateDestroyRecipientView(RetrieveUpdateDestroyAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
    lookup_url_kwarg = "recipient_id"
    permission_classes = [IsAdminUser]
