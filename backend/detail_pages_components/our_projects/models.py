from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
from parler.models import TranslatedFields, TranslatableModel


class OurProject(TranslatableModel):
    translations = TranslatedFields(
        name         = models.CharField(max_length=100, verbose_name="Название"),
        announcement = models.TextField(verbose_name="Анонс"),
        description  = CKEditor5Field('Текст', config_name='default'),
    )

    slug  = models.SlugField(verbose_name="Символьный код", blank=True, unique=True)
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография", blank=True, null=True)
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")

    class Meta:
        db_table = "Our_Projects"
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def save(self, *args, **kwargs):
        if not self.slug:
            name = self.safe_translation_getter('name', any_language=True)
            self.slug = slugify(name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.safe_translation_getter('name', any_language=True)


