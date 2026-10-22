from django.db.models import Count
from rest_framework import viewsets

from .models import Classe
from .serializers import ClasseSerializer


class ClassesViewSet(viewsets.ModelViewSet):
    serializer_class = ClasseSerializer
    search_fields = ["nom", "niveau"]
    ordering_fields = ["nom", "niveau", "nb_etudiants", "created_at"]
    ordering = ["nom"]

    def get_queryset(self):
        return Classe.objects.annotate(nb_etudiants=Count("etudiants"))
