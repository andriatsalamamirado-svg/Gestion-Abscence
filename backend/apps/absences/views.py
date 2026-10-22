from rest_framework import viewsets

from .models import Absence
from .serializers import AbsenceSerializer


class AbsencesViewSet(viewsets.ModelViewSet):
    serializer_class = AbsenceSerializer
    filterset_fields = ["statut", "matiere", "etudiant", "etudiant__classe"]
    search_fields = ["etudiant__nom", "etudiant__prenom", "etudiant__matricule", "matiere__nom"]
    ordering_fields = ["date_absence", "nb_heures", "statut", "created_at"]
    ordering = ["-date_absence", "-id"]

    def get_queryset(self):
        return Absence.objects.select_related("etudiant", "etudiant__classe", "matiere")
