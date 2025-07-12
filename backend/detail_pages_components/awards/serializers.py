from rest_framework import serializers

from detail_pages_components.awards.models import Award
from detail_pages_components.events.models import Event


class AwardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = ("id", "name", "slug", "announcement", "image")

class AwardsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = ("id", "name", "description", "announcement", "image")
