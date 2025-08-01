'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/config/store';
import { setLocale } from '@/shared/redux/store/localeSlice';
import Cookies from 'js-cookie';

import styles from './localeSwitcher.module.css';

type Theme = 'black' | 'white';

interface Props {
  theme?: Theme;
}

export function LocaleSwitcher({ theme = 'white' }: Props) {
  const dispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  const changeLanguage = (locale: string) => {
    if (locale === currentLocale) return;

    dispatch(setLocale(locale));
    Cookies.set('NEXT_LOCALE', locale, { expires: 365, path: '/' });

    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => changeLanguage('ru')}
        className={`${styles[theme]} ${currentLocale === 'ru' ? styles.active : ''}`}
      >
        RUS
      </button>
      <button
        onClick={() => changeLanguage('lz')}
        className={`${styles[theme]} ${currentLocale === 'lz' ? styles.active : ''}`}
      >
        LEZ
      </button>
    </div>
  );
}
