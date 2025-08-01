'use client';

import styles from './companyInfo.module.css';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface DataType {
  title: string;
  description: string;
}

export function CompanyInfo() {
  const t = useTranslations('companyInfoBlock');
  const [active, setActive] = useState(0);
  const data: DataType[] = t.raw('data');

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {data.map((item, ind) => (
          <motion.button
            key={ind}
            onClick={() => setActive(ind)}
            className={`${styles.elem} ${ind === active ? styles.active : ''}`}
            whileTap={{ scale: 1.03 }}
            animate={{ backgroundColor: ind === active ? '#ffffff' : '#E5E5E5' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <p>{item.title}</p>
          </motion.button>
        ))}
      </div>

      <div>
          <div className={styles.textBlock}> 
            
            <div className={styles.scrollBar}>
                <div className={styles.square}></div>
                <div className={styles.line}></div>
            </div>
            <div className={styles.text}>
                <p className={styles.title}>{data[active].title}</p>
                <p className={styles.description}>{data[active].description}</p>
            </div>

          </div>
      </div>
    </div>
  );
}
