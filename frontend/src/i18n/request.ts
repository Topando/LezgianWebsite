import { getRequestConfig } from 'next-intl/server';
import { cookies as getCookies} from 'next/headers';

const locales = ['ru', 'lz'] as const;
type Locale = typeof locales[number];

type Messages = {
  common: Record<string, string>;
  homePage: Record<string, string>;
  nav: Record<string, string>;
};

export default getRequestConfig(async () => {
  const cookieStore = getCookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'ru';
  
  const typedLocale = (locale) as Locale;

  const messages: Messages = {
    common: (await import(`../../public/locales/${typedLocale}/common.json`)).default,
    homePage: (await import(`../../public/locales/${typedLocale}/homePage.json`)).default,
    nav: (await import(`../../public/locales/${typedLocale}/nav.json`)).default
  };

  return {
    locale: typedLocale,
    messages,
  };
});
