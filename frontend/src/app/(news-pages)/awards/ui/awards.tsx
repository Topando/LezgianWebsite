'use client'

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { NewsType, newsGet } from '@/shared/api/endpoints/news';
import { NewsBasicPageComp } from '../../newsBasicPageComp/newsBasicPageComp';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { Separator } from '@/features/separator';
import { Pagination } from '@/widgets/pagination';


export function AwardsPage () {
    const nT = useTranslations('namePages');

    const [data, setData] = useState<NewsType[]>([]);
    const [pageData, setPageData] = useState<NewsType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await newsGet('awards');
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
            <NewsBasicPageComp title={nT('awards')} data={pageData}/>

            <Separator/>
            <Pagination data={data} countOnePage={8} onPageChange={setPageData} />
        </div>
    )
}