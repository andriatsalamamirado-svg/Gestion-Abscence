from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Absence(models.Model):
    class Statut(models.TextChoices):
        NON_JUSTIFIEE = "non_justifiee", "Non justifiée"
        JUSTIFIEE = "justifiee", "Justifiée"

    etudiant = models.ForeignKey(
        "etudiants.Etudiant", on_delete=models.CASCADE, related_name="absences"
    )
    matiere = models.ForeignKey(
        "matieres.Matiere", on_delete=models.PROTECT, related_name="absences"
    )
    date_absence = models.DateField("date de l'absence")
    nb_heures = models.PositiveSmallIntegerField(
        "nombre d'heures",
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(12)],
    )
    statut = models.CharField(max_length=15, choices=Statut.choices, default=Statut.NON_JUSTIFIEE)
    motif = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "absence"
        ordering = ["-date_absence", "-id"]

    def __str__(self):
        return f"{self.etudiant} - {self.matiere} - {self.date_absence}"
