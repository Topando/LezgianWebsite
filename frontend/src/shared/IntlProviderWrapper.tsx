'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/config/store';


type Messages = {
    common: Record<string, string>;
    homePage: Record<string, string>;
    nav: Record<string, string>;
    companyInfoBlock: Record<string, string>;
    namePages: Record<string, string>;
  };

export default function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const locale = useSelector((state: RootState) => state.locale.locale);
  const [messages, setMessages] = useState<Messages>();

  useEffect(() => {
    async function loadMessages() {
        const messages: Messages = {
            common: (await import(`../../public/locales/${locale}/common.json`)).default,
            homePage: (await import(`../../public/locales/${locale}/homePage.json`)).default,
            nav: (await import(`../../public/locales/${locale}/nav.json`)).default,
            companyInfoBlock: (await import(`../../public/locales/${locale}/companyInfoBlock.json`)).default,
            namePages: (await import(`../../public/locales/${locale}/namePages.json`)).default,
        };

      setMessages(messages);
    }
    loadMessages();
  }, [locale]);

  if (!messages) {
    return <div></div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
