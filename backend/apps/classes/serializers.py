import re

from rest_framework import serializers

from .models import Classe


class ClasseSerializer(serializers.ModelSerializer):
    nb_etudiants = serializers.IntegerField(read_only=True)

    class Meta:
        model = Classe
        fields = ["id", "nom", "niveau", "nb_etudiants", "created_at"]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {"nom": {"error_messages": {"unique": "Une classe porte déjà ce nom."}}}

    def to_internal_value(self, data):
        data = data.copy()
        for nom in ("nom", "niveau"):
            if isinstance(data.get(nom), str):
                data[nom] = re.sub(r"\s+", " ", data[nom]).strip()
        return super().to_internal_value(data)
