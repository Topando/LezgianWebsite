from django.core.cache import cache
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from our_projects.models import OurProject
from our_projects.serializers.gallery_serializer import OurProjectsGallerySerializer


class OurProjectsListViewSet(mixins.ListModelMixin,
                      GenericViewSet):
    queryset = OurProject.objects.all()
    serializer_class = OurProjectsGallerySerializer

    def get_queryset(self):
        return OurProject.objects.all().order_by('-order')

    def list(self, request, *args, **kwargs):
        cache_key = "our_projects_gallery"
        cache_data = cache.get(cache_key)
        if cache_data:
            return Response(cache_data)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response = serializer.data
        cache.set(cache_key, response, timeout=60 * 60 * 24 * 7)
        return Response(response)