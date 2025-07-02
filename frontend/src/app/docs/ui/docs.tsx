"use client"

import styles from "./docs.module.css";

import { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { Docs, docs } from "@/shared/api/endpoints/docs";
import { useRightNav } from '@/shared/context/RightNavContext';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';

export function DocsPage () {
    const [data, setData] = useState<Docs[]>([]);
    const { setContent } = useRightNav();

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
        const base = [{ id: "0", label: "Устав ФЛНКА" }];
        const dynamic = data.map((item, index) => ({
            id: `${index + 1}`,
            label: item.title,
        }));
        return [...base, ...dynamic];
    }, [data]);

    useEffect(() => {
        setContent(<PageSectionsNav sections={sections} />);
        return () => setContent(null);
    }, [sections, setContent]);

    return (
        <div className={styles.container}>
            <p className={styles.heading}>Документы</p>

            <div className={styles.articlesCompany} id="0">
                <h1 className={styles.titleDocs}>Устав Федеральной Лезгинской НКА</h1>
                <p className={styles.descText}>Это основной документ, регламентирующий деятельность организации. В нем зафиксированы цели и задачи ФЛНКА, структура, порядок принятия решений, права и обязанности членов.</p>
            </div>

            {data.map((item, ind) => (
                <div key={ind}>
                    <div className={styles.separator}></div>
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
                                        <Image
                                            className={styles.fileIcon}
                                            src={'/images/navIcons/fileIcon.svg'}
                                            width={16}
                                            height={16}
                                            alt='Файл'
                                        />
                                        <p className={styles.fileTitle}>{elem.title}</p>
                                        <p className={styles.download}>Скачать</p>
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
