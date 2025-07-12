from django.contrib import admin

from detail_pages_components.society.models import Society


@admin.register(Society)
class SocietyAdmin(admin.ModelAdmin):
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
