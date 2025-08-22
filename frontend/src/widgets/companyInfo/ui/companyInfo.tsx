'use client';

import styles from './companyInfo.module.css';
import { useState, useEffect } from 'react';
import { AboutType, aboutGet } from "@/shared/api/endpoints/about";
import { motion } from 'framer-motion';
import { parseOnlyText } from '@/features/parseAlbumImg/parseAlbumImg';
import Link from 'next/link';

export function CompanyInfo() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<AboutType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await aboutGet();

        // Нормализация ответа в массив
        const normalized: AboutType[] =
          Array.isArray(response)
            ? response
            : (response && typeof response === 'object' && Array.isArray((response as any).results))
              ? (response as any).results
              : [];

        setData(normalized);
      } catch (err) {
        console.error(err);
        setData([]); // безопасный fallback
      }
    };

    getData();
  }, []);

  // Если данных стало меньше и active вышел за границы — сбросить в 0
  useEffect(() => {
    if (data.length > 0 && active >= data.length) {
      setActive(0);
    }
  }, [data.length, active]);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {data.slice(0, 4).map((item, ind) => (
          <motion.button
            key={item?.menu_title ?? ind}
            onClick={() => setActive(ind)}
            className={`${styles.elem} ${ind === active ? styles.active : ''}`}
            whileTap={{ scale: 1.03 }}
            animate={{ backgroundColor: ind === active ? '#F8F8F8' : '#ffffff' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <p>{item?.menu_title ?? ''}</p>
          </motion.button>
        ))}
      </div>

      <div>
        <div className={styles.textBlock}>
          <div className={styles.text}>
            <div className={styles.separator}></div>
            {data.length > 0 && data[active] ? (
              <p className={styles.description}>{parseOnlyText(data[active]?.body ?? '')}</p>
            ) : (
              <p className={styles.description}></p>
            )}
          </div>

          <Link href="/about" className={styles.buttonMore}>
            Читать все
          </Link>
        </div>
      </div>
    </div>
  );
}
