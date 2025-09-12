"use client";

import styles from './homepage.module.css';

import React, { useState, useEffect } from 'react';
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
import { Pagination } from '@/widgets/pagination';

/** те же соответствия, что и в поиске */
const accordancTable: Record<string, string> = {
  award: 'awards',
  'candidate-award': 'awards',
  event: 'events',
  culture: 'culture',
  history: 'history',
  language: 'language',
  society: 'society',
  ourproject: 'projects',
  project: 'projects',
  congress: 'congresses',
  'newsonmain': 'news-on-main',
};

const canonicalModel = (m: string) => (m === 'ourproject' ? 'project' : m);
const pathFromModel = (model?: string) => {
  if (!model) return 'news-on-main'; // дефолт на случай отсутствия model
  const m = canonicalModel(model);
  return accordancTable[m] ?? m;
};

// Если в вашем типе NewsType ещё нет model/slug — добавьте в типизацию
type NewsWithModel = NewsType & { model?: string; slug: string };

export function HomepageContent() {
  const [data, setData] = useState<NewsWithModel[]>([]);
  const [pageData, setPageData] = useState<NewsWithModel[]>([]);
  const cmT = useTranslations('common');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await newsGet('news-on-main');
        setData(response as NewsWithModel[]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <PageSectionsNav sections={SectionsMainPage()} />

      <p className={styles.headerPage}>{cmT('full-name')}</p>

      <div className={styles.mobileSeparator}>
        <Separator />
      </div>

      <CompanyInfo />
      <Separator />

      <Awards />
      <Separator />

      <div className={styles.containerNews}>
        {pageData.map((elem) => {
          const href = `/${pathFromModel(elem.model)}/${elem.slug}`;
          const key = `${canonicalModel(elem.model ?? 'news-on-main')}:${elem.slug}`;

          return (
            <div key={key}>
              <Separator />
              <Link href={href}>
                {elem.image ? (
                  <div className={styles.containerImg}>
                    <Image
                      src={replaceLocalhostWithBackend(elem.image)}
                      width={680}
                      height={360}
                      alt={elem.name}
                    />
                  </div>
                ) : null}

                <div className={styles.containerText}>
                  <p className={styles.title}>{elem.title}</p>
                  <p>{elem.announcement}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <Pagination data={data} countOnePage={8} onPageChange={setPageData} />
    </div>
  );
}
