from rest_framework.routers import DefaultRouter

from .views import ClassesViewSet

router = DefaultRouter()
router.include_root_view = False
router.include_format_suffixes = False
router.register("classes", ClassesViewSet, basename="classes")

urlpatterns = router.urls
