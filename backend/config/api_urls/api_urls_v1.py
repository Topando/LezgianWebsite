from django.urls import path, include

urlpatterns = [
    path('partners-gallery/', include('content_list.partners.urls')),
    path('projects/', include('our_projects.urls')),
    path('documents/', include('documents.urls')),
    path('congresses/', include('content_list.congresses.urls')),
    path('contacts/', include('contacts.urls')),
    path('reports/', include('reports.urls')),
    path('about/', include('about_us.urls')),
    path('feedback-form/', include('feedback_form.urls'))
]
