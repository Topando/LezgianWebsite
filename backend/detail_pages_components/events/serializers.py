from rest_framework import serializers

from detail_pages_components.events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("id", "name", "slug", "announcement", "image", "date", "place")

class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("id", "name", "description", "announcement", "image", "date", "place")
