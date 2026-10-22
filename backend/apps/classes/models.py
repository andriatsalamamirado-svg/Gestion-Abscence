from django.db import models


class Classe(models.Model):
    nom = models.CharField(max_length=80, unique=True)
    niveau = models.CharField(max_length=30, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "classe"
        ordering = ["nom"]

    def __str__(self):
        return self.nom
