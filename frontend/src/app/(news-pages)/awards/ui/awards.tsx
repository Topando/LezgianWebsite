'use client'

import { useState, useEffect } from 'react';

import { NewsType, newsGet } from '@/shared/api/endpoints/news';
import { NewsBasicPageComp } from '../../newsBasicPageComp/newsBasicPageComp';
import { SectionsMainPage } from '@/shared/sectionsMainPage';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';


export function AwardsPage () {
    const [data, setData] = useState<NewsType[]>([]);

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
            <PageSectionsNav sections={SectionsMainPage}/>
            <NewsBasicPageComp title='Народная премия - Лезгинская Звезда' data={data}/>
        </div>
    )
}