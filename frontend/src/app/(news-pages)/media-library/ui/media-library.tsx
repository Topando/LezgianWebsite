'use client';

import styles from './media-library.module.css';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { MediaLibGet, MediaLibType } from '@/shared/api/endpoints/media-library';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { Separator } from '@/features/separator';
import { Pagination } from '@/widgets/pagination';
import { useGlobalLightbox } from '@/shared/context/GlobalLightboxContext';

export function MediaLib() {
    const nT = useTranslations('namePages');

    const { openLightbox, registerSlides } = useGlobalLightbox();

    const [data, setData] = useState<MediaLibType[]>([]);
    const [pageData, setPageData] = useState<MediaLibType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await MediaLibGet();
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const mappedSlides = data.map(img => {
        const url = img.image;
        return { src: url.split("?")[0] };
    });

        registerSlides(mappedSlides);
    }, [data, registerSlides]);

    return (
        <div>
            <PageSectionsNav sections={SectionsMainPage()}/>

            <p className={styles.headerPage}>{nT('media')}</p>
            <Separator/>

            <div className={styles.galleryContainer}>
                {pageData.map((img, ind) => {
                const fullSrc = replaceLocalhostWithBackend(img.image).split("?")[0];

                return (
                    <div
                    key={ind}
                    className={`${styles.imgContainer} ${
                        (ind) % 7 === 0 ? styles.bigElem : ''
                        }`}
                    onClick={() => openLightbox(ind)}
                        >
                        <Image
                            src={fullSrc}
                            alt="Фото из медиатеки"
                            width={680}
                            height={680}
                            priority={ind < 3}
                        />
                    </div>
                );
                })}
            </div>

            <Separator/>
            <Pagination data={data} countOnePage={14} onPageChange={setPageData} />
        </div>
    );
}
