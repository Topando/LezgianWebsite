"use client"

import styles from "./docs.module.css";

import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { Docs, docs } from "@/shared/api/endpoints/docs";
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { Separator } from "@/features/separator";

export function DocsPage () {
    const nT = useTranslations('namePages');
    const cT = useTranslations('common');
    const [data, setData] = useState<Docs[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await docs();
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    const sections = useMemo(() => {
        const base = [{ id: "0", label: cT('short-regulation') }];
        const dynamic = data.map((item, index) => ({
            id: `${index + 1}`,
            label: item.title,
        }));
        return [...base, ...dynamic];
    }, [data]);


    return (
        <div className={styles.container}>
            <PageSectionsNav sections={sections}/>

            <p className={styles.heading}>{nT('docs')}</p>
            <Separator/>

            <div className={styles.articlesCompany} id="0">
                <h1 className={styles.titleDocs}>{cT('regulation')}</h1>
                <p className={styles.descText}>{cT('base-docs')}</p>
            </div>

            {data.map((item, ind) => (
                <div key={ind}>
                    <Separator/>
                    <div className={styles.docsElemContainer} id={`${ind + 1}`}>
                        <p className={styles.titleDocs}>{item.title}</p>
                        <p className={styles.descText}>{item.description}</p>

                        <div className={styles.documents}>
                            {item.documents.map((elem, index) => (
                                <a 
                                    key={index}
                                    href={elem.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    <div className={styles.fileElem}>
                                        <div className={styles.nameFile}>
                                            <Image
                                                className={styles.fileIcon}
                                                src={'/images/navIcons/fileIcon.svg'}
                                                width={16}
                                                height={16}
                                                alt='Файл'
                                            />
                                            <p className={styles.fileTitle}>{elem.title}</p>
                                        </div>
                                        <p className={styles.download}>{cT('download')}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
