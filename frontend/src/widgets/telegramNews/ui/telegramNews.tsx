'use client';

import styles from './telegramNews.module.css';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { TelegramNewsGet, TelegramNewsType } from '@/shared/api/endpoints/telegram';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';

export function TelegramNews() {
  const cT = useTranslations('common');
  const [data, setData] = useState<TelegramNewsType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await TelegramNewsGet();
        setData(response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src='/images/linksNetwork/telegram-news.svg' width={24} height={24} alt='Иконка телеграмм'/>
        <p>{cT('telegram')}</p>
      </div>

      <div className={styles.containerNews}>
        {data.map((item, ind) => (
          <div className={styles.newsElem} key={ind}>
            <a href={item.post_url} target="_blank" rel="noopener noreferrer">
              {item.photo_url && (
                <div className={styles.photoContainer}>
                  <Image
                    src={replaceLocalhostWithBackend(item.photo_url)}
                    alt={item.text.slice(0, 50)}
                    width={600}
                    height={400}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <p className={styles.text}>{item.text}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
