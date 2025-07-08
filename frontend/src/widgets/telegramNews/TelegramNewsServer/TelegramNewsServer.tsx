import { TelegramNews } from "../TelegramNewsClient";
import Parser from 'rss-parser';

interface NewsType {
  text: string;
  url: string;
}

export async function TelegramNewsServer() {
  const parser = new Parser();
  let news: NewsType[] = [];

  try {
    const now = new Date().toISOString();
    console.log('Попытка получить новости с API:', now);

    const res = await fetch('https://.app/telegram/channel/flnka?limit=15', {
      next: { revalidate: 60 * 60 * 12 }, // 12 часов
    });

    // Проверка: пришло ли из кеша
    const cacheHeader = res.headers.get('x-vercel-cache');
    if (cacheHeader) {
      console.log(`Источник данных: ${cacheHeader === 'HIT' ? 'КЕШ' : 'API'}, заголовок x-vercel-cache: ${cacheHeader}`);
    } else {
      console.log('Источник данных не определён (x-vercel-cache отсутствует)');
    }

    const text = await res.text();

    // Проверка формата: XML или HTML
    const isXml = text.trim().startsWith('<?xml');
    const isHtml = text.trim().startsWith('<!DOCTYPE html>') || text.includes('<html');
    if (isXml) {
      console.log('Формат ответа: XML');
    } else if (isHtml) {
      console.warn('Формат ответа: HTML (возможно, ошибка или Cloudflare)');
      throw new Error('Ожидался XML, но получен HTML');
    } else {
      console.warn('Не удалось определить формат ответа');
      throw new Error('Неизвестный формат данных');
    }

    // Парсинг XML
    const feed = await parser.parseString(text);

    news = feed.items.map(item => ({
      text: item.title || '',
      url: item.link || '#',
    }));

    console.log('Полученные заголовки новостей:');
    for (const item of news) {
      console.log('-', item.text);
    }

  } catch (e) {
    console.error('Ошибка при загрузке новостей:', e);
  }

  return <TelegramNews news={news} />;
}
