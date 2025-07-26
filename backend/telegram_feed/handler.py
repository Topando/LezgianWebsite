import re
from html import unescape
from typing import List, Dict, Any
import requests
import time

EMOJI_PATTERN = re.compile(
    "[" 
    "\U0001F600-\U0001F64F"
    "\U0001F300-\U0001F5FF"
    "\U0001F680-\U0001F6FF"
    "\U0001F1E0-\U0001F1FF"
    "\u2702-\u27B0"
    "\u24C2-\U0001F251"
    "]+",
    flags=re.UNICODE
)

_cache: Dict[str, Dict[str, Any]] = {}

def is_sticker(msg: Dict[str, Any]) -> bool:
    media = msg.get('media')
    if isinstance(media, dict) and media.get('_') == 'messageMediaDocument':
        doc = media.get('document', {})
        return doc.get('mime_type') == 'image/webp'
    return False

def parse_message(msg: Dict[str, Any], channel: str) -> Dict[str, Any]:
    raw_text = msg.get('message', '')
    clean_text = EMOJI_PATTERN.sub('', unescape(re.sub(r'<[^>]+>', '', raw_text))).strip()
    photo_url = None
    media = msg.get('media')
    if isinstance(media, dict) and media.get('_') == 'messageMediaPhoto':
        photo_url = f"https://tg.i-c-a.su/media/{channel.lstrip('@')}/{msg.get('id')}"
    return {'text': clean_text, 'photo_url': photo_url}

def fetch_and_parse_telegram_posts(channel: str, limit: int = 8) -> List[Dict[str, Any]]:
    key = f"{channel}:{limit}"
    now = time.time()
    if key in _cache and now - _cache[key]['time'] < 86400:
        return _cache[key]['data']
    url = f"https://tg.i-c-a.su/json/{channel.lstrip('@')}?limit={limit}"
    response = requests.get(url, timeout=20)
    if response.status_code == 200:
        data = response.json()
        msgs = data.get('messages') or data.get('result', {}).get('messages', [])
        parsed = [parse_message(m, channel) for m in msgs if 'message' in m and not is_sticker(m)]
        _cache[key] = {'time': now, 'data': parsed}
        return parsed
    if key in _cache:
        return _cache[key]['data']
    response.raise_for_status()
