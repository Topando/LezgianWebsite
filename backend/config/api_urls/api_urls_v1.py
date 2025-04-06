from django.urls import path, include

urlpatterns = [
    path('partners-gallery/', include('content_list.partners.urls'))
]
