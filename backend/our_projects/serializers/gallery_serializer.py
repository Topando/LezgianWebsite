from rest_framework import serializers

from our_projects.models import OurProject


class OurProjectsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = OurProject
        fields = ("id", "name", "slug", "announcement", "image")

class OurProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurProject
        fields = ("id", "name", "description", "image")
