import asyncio

from django.urls import path

from telegram_feed.views import LatestPosts
urlpatterns = [
    path("", LatestPosts.as_view()),
]