from rest_framework import serializers

from detail_pages_components.events.models import Event
from detail_pages_components.society.models import Society


class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ("id", "name", "slug", "announcement", "image")

class SocietyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ("id", "name", "description", "announcement", "image")
