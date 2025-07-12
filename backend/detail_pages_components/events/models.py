from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field



class Event(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    slug = models.SlugField(verbose_name="Символьный код", blank=True, unique=True)
    announcement = models.TextField(verbose_name="Анонс")
    description = CKEditor5Field('Текст', config_name='default')
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография")
    date = models.DateField(verbose_name="Дата проведения")
    place = models.CharField(max_length=100, verbose_name="Место проведения")
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")


    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save()

    def __str__(self):
        return self.name



