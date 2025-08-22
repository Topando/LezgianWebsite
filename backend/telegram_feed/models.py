from django.db import models

class TelegramPost(models.Model):
    channel = models.CharField(max_length=255, db_index=True)
    post_id = models.BigIntegerField(db_index=True)  # <- добавили
    text = models.TextField()
    post_url = models.URLField()
    photo = models.ImageField(upload_to="telegram_posts/", blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)        # локальный абсолютный URL
    photo_source_url = models.URLField(blank=True, null=True) # исходник (tg.i-c-a.su)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("channel", "post_id")