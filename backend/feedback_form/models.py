from django.db import models
from django.db.models import EmailField


class FeedbackForm(models.Model):
    active = models.BooleanField(default=True)
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = EmailField(verbose_name="Email", null=True, blank=True)
    phone = models.CharField(verbose_name="Телефон")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата отклика")

    class Meta:
        verbose_name = "Форма обратной связи"
        verbose_name_plural = verbose_name
