"use client"

import styles from './homepage.module.css';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { Separator } from '@/features/separator';

import { CompanyInfo } from '@/widgets/companyInfo';
import { Awards } from '@/widgets/awards';
import { newsGet, NewsType } from '@/shared/api/endpoints/news';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';


export function HomepageContent () {
  const [data, setData] = useState<NewsType[]>([]);
  const cmT = useTranslations('common');

  useEffect(() => {
      const getData = async () => {
          try {
              const response = await newsGet('news-on-main');
              setData(response);
          } catch (err) {
              console.log(err);
          }
      };

      getData();
  }, []);

    return (
        <div>
          <PageSectionsNav sections={SectionsMainPage()}/>

          <p className={styles.headerPage}>{cmT('full-name')}</p>
          <Separator/>

          <CompanyInfo/>
          <Separator/>

          <Awards/>
          <Separator/>

          <div className={styles.containerNews}>
            {data.map((elem, ind) => (
              <>
              <Separator/>

              <Link key={ind} href={`news-on-main/${elem.slug}`}>
                {elem.image ? (
                  <div className={styles.containerImg}>
                    <Image src={replaceLocalhostWithBackend(elem.image)} width={680} height={360} alt={elem.name}/>
                  </div>
                ):(<></>)}

                <div className={styles.containerText}>
                  <p className={styles.title}>{elem.name}</p>
                  <p>{elem.announcement}</p>
                </div>
              </Link>

              </>
            ))}
          </div>
        </div>
    )
}
