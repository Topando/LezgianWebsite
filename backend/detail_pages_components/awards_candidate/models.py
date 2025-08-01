from django.conf import settings
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from parler.models import TranslatableModel, TranslatedFields
from django.utils.text import slugify



class CandidateAwards(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=100, verbose_name="Название"),
        description=CKEditor5Field('Текст', config_name='default'),
    )
    slug = models.SlugField(verbose_name="Символьный код", blank=True, unique=True, null=True)
    image = models.ImageField(upload_to='awards_candidate/%Y/%m/%d/', verbose_name="Фото")

    class Meta:
        verbose_name = "Премия"
        verbose_name_plural = "Премия"



    def __str__(self):
        return self.safe_translation_getter('name', any_language=True)


class Candidate(models.Model):
    name = models.CharField(max_length=255, verbose_name="ФИО")
    description = models.TextField(verbose_name="Описание")
    photo = models.ImageField(upload_to="candidates", verbose_name="Фото")
    number_of_votes = models.IntegerField(default=0, verbose_name="Количество голосов")
    awards = models.ForeignKey(CandidateAwards, related_name="candidates", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Кандидат"
        verbose_name_plural = "Кандидаты"
