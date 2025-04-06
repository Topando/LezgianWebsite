from django.db import models

class OurProject(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    announcement = models.TextField(verbose_name="Анонс")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(upload_to="our_projects/", verbose_name="Фотография")
    order = models.PositiveIntegerField(default=1, verbose_name="Сортировка")

    class Meta:
        db_table = "Our_Projects"
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"