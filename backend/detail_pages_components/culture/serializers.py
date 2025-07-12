from rest_framework import serializers

from detail_pages_components.culture.models import Culture
from detail_pages_components.history.models import History


class CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = ("id", "name", "slug", "announcement", "image")

class CultureDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = ("id", "name", "description", "announcement", "image")
