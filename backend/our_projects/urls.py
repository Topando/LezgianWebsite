from rest_framework import routers

from our_projects.views.gallery_views import OurProjectsListViewSet

router = routers.DefaultRouter()
router.register(r'gallery', OurProjectsListViewSet, basename='projects-gallery')
urlpatterns = router.urls