import re

from rest_framework import serializers

from .models import Etudiant


class EtudiantsSerializer(serializers.ModelSerializer):
    nom_complet = serializers.CharField(read_only=True)
    classe_nom = serializers.CharField(source="classe.nom", read_only=True)

    class Meta:
        model = Etudiant
        fields = [
            "id", "matricule", "nom", "prenom", "nom_complet", "email",
            "telephone", "classe", "classe_nom", "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {
            "matricule": {"error_messages": {"unique": "Ce matricule existe déjà."}},
            "email": {"error_messages": {"unique": "Un étudiant avec cet email existe déjà."}},
        }

    def to_internal_value(self, data):
        data = data.copy()
        if isinstance(data.get("matricule"), str):
            data["matricule"] = data["matricule"].strip().upper()
        if isinstance(data.get("email"), str):
            data["email"] = data["email"].strip().lower()
        if isinstance(data.get("telephone"), str):
            data["telephone"] = re.sub(r"[\s.\-()]", "", data["telephone"])
        for nom in ("nom", "prenom"):
            if isinstance(data.get(nom), str):
                data[nom] = re.sub(r"\s+", " ", data[nom]).strip()
        return super().to_internal_value(data)
