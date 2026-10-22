from rest_framework import viewsets

from .models import Matiere
from .serializers import MatiereSerializer


class MatieresViewSet(viewsets.ModelViewSet):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    search_fields = ["nom", "code", "enseignant"]
    ordering_fields = ["nom", "code", "enseignant", "created_at"]
    ordering = ["nom"]
