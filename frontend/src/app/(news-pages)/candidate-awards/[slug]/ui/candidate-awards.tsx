'use client'

import styles from './candidate-awards.module.css';
import { useState, useEffect } from "react";
import Image from "next/image";

import { AwardsDetailGet, AwardsDetailType, CandidateType } from "@/shared/api/endpoints/awards";
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { HtmlBlock } from '@/features/htmlBlock';

interface Props {
    slug: string;
}

export default function DetailPage ({ slug }: Props) {
    const [data, setData] = useState<AwardsDetailType>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await AwardsDetailGet(slug);
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, [slug]);

    return(
        <>
        {data ? (
            <div className={styles.container}>
            
                <div className={styles.containerImg}>
                    <Image src={replaceLocalhostWithBackend(data.photo)} width={680} height={360} alt={data.title}/>
                </div>

                <div className={styles.containerText}>
                    <p className={styles.title}>{data.title}</p>
                    <HtmlBlock body={data.description}/>
                </div>

                <div className={styles.candidateContainer}>
                    <div className={styles.header}>
                        <p className={styles.title}>Кандидаты</p>
                        <p className={styles.description}>Ознакомьтесь с участниками и сделайте выбор</p>
                    </div>

                    <div className={styles.candidateList}>
                        {data.candidates.map((elem, ind)=> (
                            <CandidateElem data={elem} key={ind}/>
                        ))}
                    </div>


                </div>
            </div>

        ):(<></>)}
        </>
    )
}

interface CandidateElemProps {
    data: CandidateType;
}

function CandidateElem ({ data }: CandidateElemProps) {

    return (
        <div className={styles.candidateElem}>
            <div className={styles.containerImg}>
                <Image src={replaceLocalhostWithBackend(data.photo)} width={240} height={240} alt={data.name} />
            </div>
            <div className={styles.candidateMainContent}>
                <p className={styles.title}>{data.name}</p>
                <p className={styles.description}>{data.description}</p>

                <button>Выбрать</button>
            </div>
        </div>
    )
}