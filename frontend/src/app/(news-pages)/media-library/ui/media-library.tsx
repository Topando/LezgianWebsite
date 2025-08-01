'use client';

import styles from './media-library.module.css';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { MediaLibGet, MediaLibType } from '@/shared/api/endpoints/media-library';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { GlobalLightbox } from '@/shared/globalLightbox';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { Separator } from '@/features/separator';
import { Pagination } from '@/widgets/pagination';

export function MediaLib() {
    const nT = useTranslations('namePages');

    const [data, setData] = useState<MediaLibType[]>([]);
    const [slides, setSlides] = useState<{ src: string }[]>([]);
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
        if (data.length > 0) {
            setSlides(data.map(img => ({ src: img.image })));
        }
        data.map(img => (console.log(img.image)));
    }, [data]);

    return (
        <div>
            <PageSectionsNav sections={SectionsMainPage()}/>

            <p className={styles.headerPage}>{nT('media')}</p>

            <div className={styles.galleryContainer}>
                {pageData.map((img, ind) => (
                    <div
                        key={ind}
                        className={styles.imgContainer}
                    >
                        <Image
                            src={replaceLocalhostWithBackend(img.image)}
                            alt="Фото из медиатеки"
                            width={680}
                            height={680}
                        />
                    </div>
                ))}
            </div>

            <GlobalLightbox slides={slides} galleryId="gallery" />

            <Separator/>
            <Pagination data={data} countOnePage={14} onPageChange={setPageData} />
        </div>
    );
}
