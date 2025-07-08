from rest_framework import routers

from content_list.congresses.views import CongressViewSet
from reports.views import ReportViewSet

router = routers.DefaultRouter()
router.register(r'', ReportViewSet, "congresses")

urlpatterns = router.urls
