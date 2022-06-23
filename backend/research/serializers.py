from rest_framework import serializers
from .models import ResearchArchive


class ResearchArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchArchive
        fields = ['id', 'Title', 'TitleID', 'Link', 'PubYear', 'DateAdded',
                  'Category', 'UserID', 'Abstract', 'Author', 'Citations']
