from rest_framework import serializers

from detail_pages_components.news_on_main.models import NewsOnMain


class NewsOnMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsOnMain
        fields = ("id", "name", "slug", "announcement", "image")

class NewsOnMainDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsOnMain
        fields = ("id", "name", "description", "announcement", "image")
