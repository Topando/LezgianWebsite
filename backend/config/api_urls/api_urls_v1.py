from django.urls import path, include

urlpatterns = [
    path('partners-gallery/', include('content_list.partners.urls')),
    path('projects/', include('our_projects.urls')),
    path('events/', include('detail_pages_components.events.urls')),
    path('awards/', include('detail_pages_components.awards.urls')),
    path('society/', include('detail_pages_components.society.urls')),
    path('history/', include('detail_pages_components.history.urls')),
    path('culture/', include('detail_pages_components.culture.urls')),
    path('language/', include('detail_pages_components.language.urls')),
    path('documents/', include('documents.urls')),
    path('congresses/', include('content_list.congresses.urls')),
    path('contacts/', include('contacts.urls')),
    path('reports/', include('reports.urls')),
    path('about/', include('about_us.urls')),
    path('feedback-form/', include('feedback_form.urls'))
]
