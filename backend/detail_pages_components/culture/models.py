from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
from parler.models import TranslatableModel, TranslatedFields

from search.handler import SearchableMixin


class Culture(SearchableMixin, TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=100),
        announcement=models.TextField(),
        description=CKEditor5Field('Текст', config_name='default')
    )
    slug = models.SlugField(blank=True, unique=True)
    image = models.ImageField(upload_to="our_projects/", blank=True, null=True)
    order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Культура"
        verbose_name_plural = "Культура"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.safe_translation_getter('name'))
        super().save()

    def __str__(self):
        return self.safe_translation_getter('name')