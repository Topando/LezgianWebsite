# admin.py
from django.contrib import admin
from django_ckeditor_5.widgets import CKEditor5Widget
from django import forms

from about_us.models import About


class AboutAdminForm(forms.ModelForm):
    class Meta:
        model = About
        fields = '__all__'
        widgets = {
            'body': CKEditor5Widget(config_name='default'),
        }

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    form = AboutAdminForm

    list_display    = ('id', 'menu_title', 'title', 'order')
    list_editable   = ('order',)
    list_per_page   = 20
    ordering        = ('order',)
    search_fields   = ('menu_title', 'title')
    fieldsets = (
        (None, {
            'fields': ('menu_title', 'title', 'order'),
        }),
        ('Контент', {
            'fields': ('body',),
        }),
    )