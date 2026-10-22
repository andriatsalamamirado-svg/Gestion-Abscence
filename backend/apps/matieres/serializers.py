import re

from rest_framework import serializers

from .models import Matiere


class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = ["id", "nom", "code", "enseignant", "created_at"]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {"code": {"error_messages": {"unique": "Ce code de matière existe déjà."}}}

    def to_internal_value(self, data):
        data = data.copy()
        for nom in ("nom", "enseignant"):
            if isinstance(data.get(nom), str):
                data[nom] = re.sub(r"\s+", " ", data[nom]).strip()
        if isinstance(data.get("code"), str):
            data["code"] = data["code"].strip().upper()
        return super().to_internal_value(data)
