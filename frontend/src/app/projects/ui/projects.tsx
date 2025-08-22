'use client';

import styles from './projects.module.css';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { NewsType, newsGet } from '@/shared/api/endpoints/news';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { Separator } from '@/features/separator';
import { Pagination } from '@/widgets/pagination';


export function ProjectsPage() {
  const nT = useTranslations('namePages');
  const cT = useTranslations('common');
  const [data, setData] = useState<NewsType[]>([]);
  const [pageData, setPageData] = useState<NewsType[]>([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await newsGet('projects');
        setData(response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div>
        <p className={styles.header}>{nT('projects')}</p>
        <Separator/>

        <div className={styles.container}>
            {pageData.map((elem, ind) => (
                <>
                {ind !== 0 ? (
                    <div className={styles.separatorMobile}>
                        <Separator/>
                    </div>
                ):(<></>)}

                <div
                    className={`${styles.newsElemContainer} ${
                    (ind) % 7 === 0 ? styles.bigElem : ''
                    }`}
                    key={ind}
                >
                    <Link href={elem.slug}>
                    <div className={styles.imageContainer}>
                        <Image
                        src={replaceLocalhostWithBackend(elem.image)}
                        width={486}
                        height={400}
                        alt={elem.name}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.newsName}>{elem.name}</p>
                        <p className={styles.newsAnonse}>{elem.announcement}</p>
                        <p className={styles.readMore}>{cT('read-more')}</p>
                    </div>
                    </Link>
                </div>
                </>
            ))}
        </div>
        <Pagination data={data} countOnePage={14} onPageChange={setPageData} />
    </div>
  );
}
