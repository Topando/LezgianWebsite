from rest_framework import serializers

from detail_pages_components.history.models import History


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ("id", "name", "slug", "announcement", "image")

class HistoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ("id", "name", "description", "announcement", "image")
