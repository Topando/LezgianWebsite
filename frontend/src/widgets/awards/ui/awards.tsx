'use client'

import styles from './awards.module.css';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AwardsGet, AwardsType } from '@/shared/api/endpoints/awards';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { parseOnlyText } from '@/features/parseAlbumImg/parseAlbumImg';

export function Awards () {
    const [data, setData] = useState<AwardsType[]>([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await AwardsGet();
            setData(response);
          } catch (err) {
            console.log(err);
          }
        };
    
        getData();
    }, []);

    return (
        <div>
            <p className={styles.headerT}>Премии</p>
            <p className={styles.descT}>Примите участие в голосовании и помогите определить победителей.</p>

            <div className={styles.eventsContainer}>
                {data.map((elem, ind) => (
                    <Link key={ind} className={styles.eventElem} href={`/candidate-awards/${elem.slug}`}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={replaceLocalhostWithBackend(elem.image)}
                                width={200}
                                height={200}
                                alt={elem.name}
                            />
                        </div>
                        <p className={styles.eventTitle}>{elem.name}</p>
                        <p className={styles.eventAnonse}>{parseOnlyText(elem.description)}</p>
                        
                    </Link>
                ))}
            </div>
        </div>
    )
}