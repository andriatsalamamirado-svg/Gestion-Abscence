from django.db import models


class Matiere(models.Model):
    nom = models.CharField("matière", max_length=100)
    code = models.CharField(max_length=20, unique=True)
    enseignant = models.CharField(max_length=100, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "matiere"
        ordering = ["nom"]

    def __str__(self):
        return f"{self.code} - {self.nom}"
