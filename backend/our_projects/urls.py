from rest_framework import routers
from rest_framework.routers import DefaultRouter

from our_projects.views.project_views import OurProjectsViewSet

router = DefaultRouter()
router.register(r'', OurProjectsViewSet, basename='ourprojects')

urlpatterns = router.urls
