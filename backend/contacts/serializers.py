from rest_framework import serializers
from .models import SiteContacts

class SiteContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SiteContacts
        fields = ("phone", "email", "address", "working_time")