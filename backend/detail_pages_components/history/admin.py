from django.contrib import admin

from detail_pages_components.history.models import History


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    """Admin for Event model with image preview and search."""
    list_display = ('name', 'order')
    search_fields = ('name', 'announcement', 'description')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'announcement', 'description')
        }),
        ('Дополнительные параметры', {
            'fields': ('image', 'order'),
        }),
    )
