from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from detail_pages_components.news_on_main.models import NewsOnMain
from detail_pages_components.news_on_main.serializers import NewsOnMainSerializer, NewsOnMainDetailSerializer


class NewsOnMainViewSet(mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         GenericViewSet):
    queryset = NewsOnMain.objects.all()
    serializer_class = NewsOnMainSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return NewsOnMain.objects.all().order_by('-order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return NewsOnMainDetailSerializer
        else:
            return NewsOnMainSerializer
