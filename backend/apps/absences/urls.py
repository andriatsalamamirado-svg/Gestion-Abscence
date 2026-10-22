from rest_framework.routers import DefaultRouter

from .views import AbsencesViewSet

router = DefaultRouter()
router.include_root_view = False
router.include_format_suffixes = False
router.register("absences", AbsencesViewSet, basename="absences")

urlpatterns = router.urls
