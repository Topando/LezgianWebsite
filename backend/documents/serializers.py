from rest_framework import serializers

from documents.models import Document, TypeDocument


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ("title", "file")


class DocumentTypeSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = TypeDocument
        fields = ("title", "description", "documents", "order")
