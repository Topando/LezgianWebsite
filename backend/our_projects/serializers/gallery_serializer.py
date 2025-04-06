from rest_framework import serializers

from our_projects.models import OurProject


class OurProjectsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = OurProject
        fields = '__all__'
