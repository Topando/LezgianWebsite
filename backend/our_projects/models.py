from django.db import models
from django.utils.text import slugify


class OurProject(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    slug = models.SlugField(verbose_name="Символьный код", blank=True, unique=True)
    announcement = models.TextField(verbose_name="Анонс")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография")
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")

    class Meta:
        db_table = "Our_Projects"
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save()