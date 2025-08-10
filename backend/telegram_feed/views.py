import os

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from telegram_feed.handler import fetch_and_parse_telegram_posts, fetch_and_store_telegram_posts
from telegram_feed.models import TelegramPost


class TelegramFeedViewSet(ViewSet):
    authentication_classes = []
    permission_classes = []

    def list(self, request):
        TG_CHANNEL = os.getenv("TG_CHANNEL", "flnka")
        channel = request.query_params.get("channel", TG_CHANNEL)
        limit = int(request.query_params.get("limit", 8))

        try:
            fetch_and_store_telegram_posts(channel, limit)
        except Exception:
            pass

        qs = (TelegramPost.objects
              .filter(channel=channel)
              .order_by("-created_at")[:limit])

        def photo_abs_url(p: TelegramPost):
            if p.photo_url:                  # уже сохранённый локальный абсолютный URL
                return p.photo_url
            if p.photo:                      # запасной вариант — собрать от запроса
                return request.build_absolute_uri(p.photo.url)
            return None

        data = [{
            "post_id":   p.post_id,
            "text":      p.text,
            "post_url":  p.post_url,
            "photo_url": photo_abs_url(p),
        } for p in qs]

        return Response(data)