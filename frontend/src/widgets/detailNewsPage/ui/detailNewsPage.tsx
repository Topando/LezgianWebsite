import styles from './detailNewsPage.module.css';

import Image from 'next/image';

import { DetailNewsType } from '@/shared/api/endpoints/news';
import { Separator } from '@/features/separator';
import { HtmlBlock } from '@/features/htmlBlock';
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { formatDate } from '@/features/formatData';
import { FeedbackForm } from '@/widgets/feedbackForm';

interface Props {
    data: DetailNewsType;
}

export function DetailNewsPage ({data}: Props) {
    
    return(
        <div>
            <p className={styles.title}>{data.name}</p>
            <Separator/>

            {data.image? (
                <div className={styles.imageContainer}>
                    <Image
                        src={replaceLocalhostWithBackend(data.image)}
                        width={486}
                        height={400}
                        alt={data.name}
                    />
                </div>
            ):(<></>)}

            <div className={styles.anounseContainer}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.anounse}>{data.announcement}</p>

                {data.date && data.place? (
                    <div className={styles.datePlaceContainer}>
                        <div className={styles.dataPlaceElem}>
                            <Image
                                src='/images/other/clock.svg'
                                width={16}
                                height={16}
                                alt='clock.svg'
                            />
                            <p>{formatDate(data.date)}</p>
                        </div>

                        <div className={styles.dataPlaceElem}>
                            <Image
                                src='/images/other/map-pin.svg'
                                width={16}
                                height={16}
                                alt='map-pin.svg'
                            />
                            <p>{data.place}</p>
                        </div>
                    </div>
                ):(<></>)}
            </div>

            <div className={styles.separatorMobile}>
                <Separator/>
            </div>

            <div className={styles.textContainer}>
                <p className={styles.title}>Описание</p>

                <HtmlBlock body={data.description}/>
            </div>

            {data.date && data.place? (
                <div>
                    <Separator/>

                    <FeedbackForm 
                        title='Записаться на мероприятие'
                        otherComment={data.name}
                    />
                </div>
            ):(<></>)}
        </div>
    )
}