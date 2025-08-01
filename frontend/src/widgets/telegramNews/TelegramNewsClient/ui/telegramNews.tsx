// app/widgets/telegramNews/TelegramNewsClient.tsx
'use client';

import styles from './telegramNews.module.css';

interface NewsItem {
  text: string;
  url: string;
}

export function TelegramNews({ news = [] }: { news?: NewsItem[] }) {
  return (
    <div className={styles.container}>
      {news.map((item, ind) => (
        <div className={styles.newsElem} key={ind}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
}
