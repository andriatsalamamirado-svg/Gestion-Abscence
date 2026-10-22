from datetime import date

from rest_framework import serializers

from .models import Absence


class AbsenceSerializer(serializers.ModelSerializer):
    etudiant_nom = serializers.CharField(source="etudiant.nom_complet", read_only=True)
    matricule = serializers.CharField(source="etudiant.matricule", read_only=True)
    classe_nom = serializers.CharField(source="etudiant.classe.nom", read_only=True)
    matiere_nom = serializers.CharField(source="matiere.nom", read_only=True)
    statut_label = serializers.CharField(source="get_statut_display", read_only=True)

    class Meta:
        model = Absence
        fields = [
            "id", "etudiant", "etudiant_nom", "matricule", "classe_nom",
            "matiere", "matiere_nom", "date_absence", "nb_heures",
            "statut", "statut_label", "motif", "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        instance = self.instance
        etudiant = attrs.get("etudiant", getattr(instance, "etudiant", None))
        matiere = attrs.get("matiere", getattr(instance, "matiere", None))
        jour = attrs.get("date_absence", getattr(instance, "date_absence", None))
        statut = attrs.get("statut", getattr(instance, "statut", Absence.Statut.NON_JUSTIFIEE))
        motif = attrs.get("motif", getattr(instance, "motif", ""))

        if jour and jour > date.today():
            raise serializers.ValidationError(
                {"date_absence": "La date de l'absence ne peut pas être dans le futur."}
            )
        if statut == Absence.Statut.JUSTIFIEE and not str(motif or "").strip():
            raise serializers.ValidationError({"motif": "Indiquez le motif de la justification."})
        if etudiant and matiere and jour:
            doublons = Absence.objects.filter(etudiant=etudiant, matiere=matiere, date_absence=jour)
            if instance:
                doublons = doublons.exclude(pk=instance.pk)
            if doublons.exists():
                raise serializers.ValidationError(
                    {"date_absence": "Cette absence est déjà enregistrée pour cet étudiant."}
                )
        return attrs
