from django.contrib import admin
from solo.admin import SingletonModelAdmin

from contacts.models import SiteContacts


@admin.register(SiteContacts)
class SiteContactsAdmin(SingletonModelAdmin):
    fieldsets = (
        (None, {"fields": ("phone", "email")}),
        ("Дополнительно", {"fields": ("address", "working_time")}),
    )