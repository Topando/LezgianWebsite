import IntlProviderWrapper from '@/shared/IntlProviderWrapper';
import { RightNavProvider } from '@/shared/context/RightNavContext';
import { LeftNav } from '@/widgets/leftNav';
import { RightNav } from '@/widgets/rightNav';
import { TelegramNewsServer } from "@/widgets/telegramNews/TelegramNewsServer";
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import styles from './layout.module.css';

export default function ClientApp({ children }: { children: React.ReactNode }) {
  return (
    <IntlProviderWrapper>
      <RightNavProvider>
        <div className={styles.parent}>
          <div className={styles.container}>
            <header className={styles.header}><Header /></header>

            <aside className={styles.leftNav}><LeftNav /></aside>

            <aside className={styles.rightNav}>
              <RightNav />
              <TelegramNewsServer />
            </aside>

            <main className={styles.main}>
              <div className={styles.pageContent}>{children}</div>
            </main>
          </div>

          <footer className={styles.footer}>
            {/*<Footer />*/}
          </footer>
        </div>
      </RightNavProvider>
    </IntlProviderWrapper>
  );
}
