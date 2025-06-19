from django.contrib import admin

from documents.models import TypeDocument, Document


class DocumentInline(admin.TabularInline):
    model = Document
    extra = 1
    fields = ('title', 'file')


@admin.register(TypeDocument)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "order")
    inlines = [DocumentInline]
    fields = (
        "title", "description", "order"
    )
    ordering = ("order",)



