from django.core.validators import RegexValidator
from django.db import models

phone_validator = RegexValidator(
    regex=r"^\+?\d{8,15}$",
    message="Numéro de téléphone invalide (8 à 15 chiffres, « + » optionnel).",
)


class Etudiant(models.Model):
    matricule = models.CharField(max_length=30, unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField("prénom", max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(
        max_length=20, blank=True, default="", validators=[phone_validator]
    )
    classe = models.ForeignKey(
        "classes.Classe", on_delete=models.PROTECT, related_name="etudiants"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "etudiant"
        ordering = ["nom", "prenom"]

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.matricule})"

    @property
    def nom_complet(self):
        return f"{self.prenom} {self.nom}"
