'use client';

import Cookies from 'js-cookie';

export function LocaleSwitcher() {
  const changeLanguage = (locale: string) => {
    Cookies.set('NEXT_LOCALE', locale, { expires: 365, path: '/' });

    window.location.reload();
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ru')}>RUS</button>
      <button onClick={() => changeLanguage('lz')}>LEZ</button>
    </div>
  );
}
