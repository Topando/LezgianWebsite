"use client"

import styles from './contacts.module.css';

import {useTranslations} from 'next-intl';
import { FeedbackForm } from '@/widgets/feedbackForm';
import { useState, useEffect } from 'react';

import { Contacts, contacts } from '@/shared/api/endpoints/contacts';
import { Separator } from '@/features/separator';

export function ContactsPage() {
    const cmT = useTranslations('common');
    const [data, setData] = useState<Contacts|null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await contacts();
                setData(response);
            }
            catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    return(
        <div className={styles.container}>
            <p className={styles.heading}>{cmT('contacts')}</p>
            <Separator/>


            <div className={styles.mainInfoContainer}>
                <p className={styles.nameCompany}>{cmT('name-company')}</p>

                <div className={styles.separatorMobile}>
                    <Separator/>
                </div>

                <div className={styles.contactsContainer}>
                    <div className={styles.elemContact}>
                        <p className={styles.title}>{cmT('address')}</p>
                        <p className={styles.desc}>{data?.address}</p>
                    </div>

                    <div className={styles.separatorMobile}>
                        <Separator/>
                    </div>

                    <div className={styles.elemContact}>
                        <p className={styles.title}>{cmT('phone')}</p>
                        <div className={styles.phonesCont}>
                            {data?.phones.map((ph, ind)=> (
                                <a className={styles.desc} href={`tel:${ph.phone}`} key={ind}>{ph.phone}</a>    
                            ))}

                        </div>
                    </div>

                    <div className={styles.separatorMobile}>
                        <Separator/>
                    </div>

                    <div className={styles.elemContact}>
                        <p className={styles.title}>{cmT('email')}</p>
                        <a className={styles.desc} href={`mailto:${data?.email}`}>{data?.email}</a>
                    </div>

                    <div className={styles.separatorMobile}>
                        <Separator/>
                    </div>

                    <div className={styles.elemContact}>
                        <p className={styles.title}>{cmT('time-job')}</p>
                        <p className={styles.desc}>{data?.working_time}</p>
                    </div>
                </div>
            </div>

            <div className={styles.separatorMobile}>
                <Separator/>
            </div>
            
            <div className={styles.feedbackFormContainer}>
                <FeedbackForm/>
            </div>
        
        </div>
    )
}