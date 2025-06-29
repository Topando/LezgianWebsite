'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/config/store';
import { setLocale } from '@/shared/redux/store/localeSlice';
import Cookies from 'js-cookie';

import styles from './localeSwitcher.module.css';

export function LocaleSwitcher() {
  const dispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  const changeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
    Cookies.set('NEXT_LOCALE', locale, { expires: 365, path: '/' });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => changeLanguage('ru')} className={currentLocale==='ru' ? styles.active: ''}>RUS</button>
      <button onClick={() => changeLanguage('lz')} className={currentLocale==='lz' ? styles.active: ''}>LEZ</button>
    </div>
  );
}
