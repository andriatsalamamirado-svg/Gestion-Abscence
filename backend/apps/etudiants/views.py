from rest_framework import viewsets

from .models import Etudiant
from .serializers import EtudiantsSerializer


class EtudiantsViewSet(viewsets.ModelViewSet):
    serializer_class = EtudiantsSerializer
    filterset_fields = ["classe"]
    search_fields = ["matricule", "nom", "prenom", "email", "classe__nom"]
    ordering_fields = ["matricule", "nom", "prenom", "email", "created_at"]
    ordering = ["nom", "prenom"]

    def get_queryset(self):
        return Etudiant.objects.select_related("classe")
