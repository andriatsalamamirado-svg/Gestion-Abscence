from rest_framework.routers import DefaultRouter

from .views import MatieresViewSet

router = DefaultRouter()
router.include_root_view = False
router.include_format_suffixes = False
router.register("matieres", MatieresViewSet, basename="matieres")

urlpatterns = router.urls
