from django.contrib import admin

from detail_pages_components.events.models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Admin for Event model with image preview and search."""
    list_display = ('name', 'date', 'place', 'order')
    list_filter = ('date', 'place')
    search_fields = ('name', 'announcement', 'description')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'announcement', 'description')
        }),
        ('Дополнительные параметры', {
            'fields': ('image', 'date', 'place', 'order'),
        }),
    )
