'use client';

import { useContext } from 'react';
import styles from './rightNav.module.css';
import { RightNavContext } from '@/shared/context/RightNavContext';

export function RightNav() {
  const { content } = useContext(RightNavContext);
  
  return (
    <aside className={styles.rightNav}>
      <div className={styles.topBlock}>
        {content || <DefaultTopContent />}
      </div>
      <div className={styles.bottomBlock}>
        <TelegramNews />
      </div>
    </aside>
  );
}

function DefaultTopContent() {
  return <div>Выберите раздел</div>;
}

function TelegramNews() {
  return <div></div>;
}