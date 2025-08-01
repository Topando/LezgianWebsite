from rest_framework import serializers

from content_list.congresses.models import Congresses


class CongressesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Congresses
        fields = '__all__'