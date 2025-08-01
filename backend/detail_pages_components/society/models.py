from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
from parler.models import TranslatableModel, TranslatedFields

class Society(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=100, verbose_name="Название"),
        announcement=models.TextField(verbose_name="Анонс"),
        description=CKEditor5Field('Текст', config_name='default'),
    )
    slug = models.SlugField(verbose_name="Символьный код", blank=True, unique=True)
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография", blank=True, null=True)
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")

    class Meta:
        verbose_name = "Общество"
        verbose_name_plural = "Общество"

    def save(self, *args, **kwargs):
        if not self.slug:
            name = self.safe_translation_getter('name', any_language=True)
            self.slug = slugify(name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.safe_translation_getter('name', any_language=True)