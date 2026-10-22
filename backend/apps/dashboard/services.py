from django.db.models import Count, Sum

from apps.absences.models import Absence
from apps.classes.models import Classe
from apps.etudiants.models import Etudiant
from apps.matieres.models import Matiere


class DashboardService:
    @staticmethod
    def stats():
        absences = Absence.objects.all()
        return {
            "total_etudiants": Etudiant.objects.count(),
            "total_classes": Classe.objects.count(),
            "total_matieres": Matiere.objects.count(),
            "total_absences": absences.count(),
            "total_heures": absences.aggregate(t=Sum("nb_heures"))["t"] or 0,
            "justifiees": absences.filter(statut=Absence.Statut.JUSTIFIEE).count(),
            "non_justifiees": absences.filter(statut=Absence.Statut.NON_JUSTIFIEE).count(),
            "plus_absents": list(
                Etudiant.objects.annotate(
                    total_heures=Sum("absences__nb_heures"), nb_absences=Count("absences")
                )
                .filter(nb_absences__gt=0)
                .select_related("classe")
                .order_by("-total_heures", "nom")[:5]
                .values("id", "matricule", "nom", "prenom", "classe__nom", "total_heures", "nb_absences")
            ),
        }
