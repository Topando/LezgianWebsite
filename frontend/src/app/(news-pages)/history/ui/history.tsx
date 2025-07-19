'use client'

import { useState, useEffect } from 'react';

import { NewsType, newsGet } from '@/shared/api/endpoints/news';
import { NewsBasicPageComp } from '../../newsBasicPageComp/newsBasicPageComp';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';

export function HistoryPage () {
    const [data, setData] = useState<NewsType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await newsGet('history');
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    return(
        <div>
            <PageSectionsNav sections={SectionsMainPage}/>
            <NewsBasicPageComp title='История' data={data}/>
        </div>
    )
}