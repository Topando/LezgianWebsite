'use client';

import styles from './projects.module.css';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectsType, projectsGet } from '@/shared/api/endpoints/projects';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { Separator } from '@/features/separator';

export function ProjectsPage() {
  const [data, setData] = useState<ProjectsType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await projectsGet();
        setData(response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div>
        <p className={styles.header}>Проекты</p>
        <Separator/>

        <div className={styles.container}>
            {data.map((elem, ind) => (
                <>
                {ind !== 0 ? (
                    <div className={styles.separatorMobile}>
                        <Separator/>
                    </div>
                ):(<></>)}

                <div
                    className={`${styles.newsElemContainer} ${
                    (ind) % 7 === 0 ? styles.bigElem : ''
                    }`}
                    key={ind}
                >
                    <Link href={elem.slug}>
                    <div className={styles.imageContainer}>
                        <Image
                        src={replaceLocalhostWithBackend(elem.image)}
                        width={486}
                        height={400}
                        alt={elem.name}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.newsName}>{elem.name}</p>
                        <p className={styles.newsAnonse}>{elem.announcement}</p>
                        <p className={styles.readMore}>Читать полностью</p>
                    </div>
                    </Link>
                </div>
                </>
            ))}
        </div>
    </div>
  );
}
