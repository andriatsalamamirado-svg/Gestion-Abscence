from rest_framework.routers import DefaultRouter

from .views import EtudiantsViewSet

router = DefaultRouter()
router.include_root_view = False
router.include_format_suffixes = False
router.register("etudiants", EtudiantsViewSet, basename="etudiants")

urlpatterns = router.urls
