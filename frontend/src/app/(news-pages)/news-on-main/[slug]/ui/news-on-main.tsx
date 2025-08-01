'use client'

import { useState, useEffect } from "react";

import { DetailNewsType, detailNewsGet } from "@/shared/api/endpoints/news";
import { DetailNewsPage } from "@/widgets/detailNewsPage";
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';

interface Props {
    slug: string;
}

export default function DetailPage ({ slug }: Props) {
    const [data, setData] = useState<DetailNewsType>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await detailNewsGet('news-on-main', slug);
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, [slug]);

    return(
        <div>
            <PageSectionsNav sections={SectionsMainPage()}/>
            {data? (
                <DetailNewsPage data={data}/>
            ):(<></>)}
        </div>
    )
}