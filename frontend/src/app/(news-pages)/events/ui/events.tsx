'use client'

import styles from './events.module.css';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { NewsType, newsGet } from '@/shared/api/endpoints/news';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { formatDate } from '@/features/formatData';
import { Separator } from '@/features/separator';
import { Pagination } from '@/widgets/pagination';


export function Events () {
    const nT = useTranslations('namePages');
    
    const [data, setData] = useState<NewsType[]>([]);
    const [pageData, setPageData] = useState<NewsType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await newsGet('events');
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    return(
        <div>
            <PageSectionsNav sections={SectionsMainPage()}/>

            <p className={styles.headerPage}>{nT('events')}</p>

            <Separator/>

            <div className={styles.eventsContainer}>
                {pageData.map((elem, ind) => (
                    <a key={ind} className={styles.eventElem} href={elem.slug}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={replaceLocalhostWithBackend(elem.image)}
                                width={200}
                                height={200}
                                alt={elem.name}
                            />
                        </div>
                        <p className={styles.eventTitle}>{elem.name}</p>
                        <p className={styles.eventAnonse}>{elem.announcement}</p>
                        <div className={styles.datePlaceContainer}>

                        <div className={styles.dataPlaceElem}>
                            <Image
                                src='/images/other/clock.svg'
                                width={16}
                                height={16}
                                alt='clock.svg'
                            />
                            <p>{elem.date? formatDate(elem.date): ''}</p>
                        </div>

                        <div className={styles.dataPlaceElem}>
                            <Image
                                src='/images/other/map-pin.svg'
                                width={16}
                                height={16}
                                alt='map-pin.svg'
                            />
                            <p>{elem.place}</p>
                        </div>

                    </div>
                    </a>
                ))}
            </div>
            
            <Separator/>
            <Pagination data={data} countOnePage={18} onPageChange={setPageData} />
        </div>
    )
}