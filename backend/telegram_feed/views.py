import asyncio

from rest_framework.response import Response
from rest_framework.views import APIView

from telegram_feed.handler_tg_feed import fetch_latest_posts


class LatestPosts(APIView):
    def get(self, request):
        data = asyncio.run(fetch_latest_posts(8))
        return Response(data)