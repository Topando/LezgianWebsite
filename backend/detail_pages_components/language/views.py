from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from detail_pages_components.culture.models import Culture
from detail_pages_components.culture.serializers import CultureSerializer, CultureDetailSerializer
from detail_pages_components.history.models import History
from detail_pages_components.history.serializers import HistorySerializer, HistoryDetailSerializer
from detail_pages_components.language.models import Language
from detail_pages_components.language.serializers import LanguageSerializer, LanguageDetailSerializer


class LanguageViewSet(mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         GenericViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return History.objects.all().order_by('-order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LanguageDetailSerializer
        else:
            return LanguageSerializer
