from rest_framework import serializers

from detail_pages_components.culture.models import Culture
from detail_pages_components.history.models import History
from detail_pages_components.language.models import Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ("id", "name", "slug", "announcement", "image")

class LanguageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ("id", "name", "description", "announcement", "image")
