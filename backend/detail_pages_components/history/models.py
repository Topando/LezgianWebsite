from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field



class History(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    slug = models.SlugField(verbose_name="Символьный код", blank=True, unique=True)
    announcement = models.TextField(verbose_name="Анонс")
    description = CKEditor5Field('Текст', config_name='default')
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография")
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")


    class Meta:
        verbose_name = "История"
        verbose_name_plural = "История"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save()

    def __str__(self):
        return self.name



