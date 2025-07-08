from rest_framework import serializers

from about_us.models import About


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'