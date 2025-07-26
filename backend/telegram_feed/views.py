import os

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from telegram_feed.handler import fetch_and_parse_telegram_posts


class TelegramFeedViewSet(ViewSet):
    authentication_classes = []
    permission_classes      = []

    def list(self, request):
        TG_CHANNEL = os.getenv("TG_CHANNEL", "flnka")
        channel = request.query_params.get("channel",
                                           TG_CHANNEL)
        limit   = int(request.query_params.get("limit", 8))
        data    = fetch_and_parse_telegram_posts(channel, limit)
        return Response(data)