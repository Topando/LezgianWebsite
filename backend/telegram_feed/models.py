from django.db import models


class TelegramPost(models.Model):
    message_id = models.PositiveBigIntegerField(unique=True)
    chat_id    = models.BigIntegerField()            # канал/группа
    text       = models.TextField(blank=True)
    photo_id   = models.CharField(max_length=200, blank=True)  # file_id фото
    date       = models.DateTimeField()

    class Meta:
        ordering = ["-date"]