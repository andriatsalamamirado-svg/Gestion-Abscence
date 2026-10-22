from django.contrib import admin
from django.urls import include, path

from apps.dashboard.views import DashboardStatsView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/dashboard/stats/", DashboardStatsView.as_view()),
    path("api/", include("apps.classes.urls")),
    path("api/", include("apps.matieres.urls")),
    path("api/", include("apps.etudiants.urls")),
    path("api/", include("apps.absences.urls")),
]
