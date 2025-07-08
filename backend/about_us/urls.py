from rest_framework import routers

from about_us.views import AboutViewSet
from content_list.congresses.views import CongressViewSet
from reports.views import ReportViewSet

router = routers.DefaultRouter()
router.register(r'', AboutViewSet, "congresses")

urlpatterns = router.urls
