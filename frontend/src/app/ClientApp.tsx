'use client';

import IntlProviderWrapper from '@/shared/IntlProviderWrapper';
import { RightNavProvider } from '@/shared/context/RightNavContext';
import { LeftNav } from '@/widgets/leftNav';
import { RightNav } from '@/widgets/rightNav';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import styles from './layout.module.css';

export default function ClientApp({ children }: { children: React.ReactNode }) {
  return (
    <IntlProviderWrapper>
      <RightNavProvider>
        <div className={styles.container}>
          <div className={styles.leftNavContainer}>
            <LeftNav/>
          </div>

          <div className={styles.mainContent}>
            <Header/>
            {children}
            <Footer/>
          </div>

          <div className={styles.rightNavContainer}>
            <RightNav/>
          </div>
        </div>
      </RightNavProvider>
    </IntlProviderWrapper>
  );
}
