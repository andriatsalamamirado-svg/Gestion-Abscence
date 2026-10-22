from rest_framework.response import Response
from rest_framework.views import APIView

from apps.absences.models import Absence
from apps.absences.serializers import AbsenceSerializer

from .services import DashboardService


class DashboardStatsView(APIView):
    def get(self, request):
        data = DashboardService.stats()
        dernieres = Absence.objects.select_related("etudiant", "etudiant__classe", "matiere")[:6]
        data["dernieres_absences"] = AbsenceSerializer(dernieres, many=True).data
        return Response(data)
