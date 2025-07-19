import styles from './newsBasicPageComp.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { NewsType } from '@/shared/api/endpoints/news';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { Separator } from '@/features/separator';

interface PropsPage {
    data: NewsType[];
    title: string;
}
interface PropsNewsElem {
    elem: NewsType;
}




export function NewsBasicPageComp ({data, title}: PropsPage) {
    return(
        <div>
            <p className={styles.header}>{title}</p>

            <div className={styles.container}>
                {data.map((elem, ind) => (
                    <>
                        <Separator/>
                        <NewsElem elem={elem} key={ind}/>
                    </>
                ))}
            </div>
        </div>
    )
}


export function NewsElem ({elem}: PropsNewsElem) {
    return (
        <div
            className={styles.newsElemContainer}
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
    )
}