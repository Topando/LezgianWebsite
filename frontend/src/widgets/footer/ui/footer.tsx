'use client'

import styles from './footer.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';

import { Contacts, contacts } from '@/shared/api/endpoints/contacts';
import { PartnersSlider } from '@/widgets/partnersSlider';

export function Footer() {
    const cmT = useTranslations('common');
    const navT = useTranslations('nav.links');

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

    return (

        <div>
            <div className={styles.partnersContainer}>
                    <PartnersSlider/>
                </div>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={`${styles.block} ${styles.navBlock}`}>
                        <p className={styles.title}>Навигация</p>
                        <div className={styles.content}>
                            <Link href='/'>{navT('main')}</Link>
                            <Link href='/about/'>{navT('about-us')}</Link>
                            <Link href='/docs/'>{navT('docs')}</Link>
                            <Link href='/projects/'>{navT('projects')}</Link>
                            <Link href='/congresses/'>{navT('congresses')}</Link>
                            <Link href='/contacts/'>{navT('contacts')}</Link>
                            <Link href='/reports/'>{navT('reports')}</Link>
                        </div>

                    </div>
                    <div className={`${styles.block} ${styles.addressBlock}`}>
                        <div>
                            <p className={styles.title}>{cmT('soc')}</p>

                            <div className={styles.content}>
                                <div className={styles.networksWrapper}>
                                    <a href='https://m.vk.com/flnka?ysclid=mdw0udbkzv817370940' target="_blank" rel="noopener noreferrer" className={styles.networkElem}>
                                        <Image className={styles.imageNetwork} src={'/images/linksNetwork/vk.svg'} width={40} height={40} alt='Группа vk'/>
                                        <p>Вконтакте</p>
                                    </a>
                                    <a href='https://t.me/flnka' target="_blank" rel="noopener noreferrer" className={styles.networkElem}>
                                        <Image className={styles.imageNetwork} src={'/images/linksNetwork/telegram.svg'} width={40} height={40} alt='telegram'/>
                                        <p>Телеграм</p>
                                    </a>
                                    <a href='https://rutube.ru/channel/24706323/?ysclid=mdw0vhyitu469300817' target="_blank" rel="noopener noreferrer" className={styles.networkElem}>
                                        <Image className={styles.imageNetwork} src={'/images/linksNetwork/rutube.svg'} width={40} height={40} alt='rutube'/>
                                        <p>Рутюб</p>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <div className={styles.contacts}>
                            <p className={styles.title}>{cmT('contacts')}</p>

                            <a href={`mailto:${data?.email}`}>{data?.email}</a>
                            {data?.phones.map((phone, ind) => (
                                <a href={`tel:${phone.phone}`} key={ind}>{phone.phone}</a>
                            ))}
                            
                        </div>

                        
                    </div>

                    <div>
                        <p className={styles.title}>{cmT('address')}</p>
                        <div className={styles.content}>
                            <p>{data?.address}</p>

                            <div className={styles.logoContainer}>
                                <Image 
                                    className={styles.logo}
                                    src={'/images/logo.png'}
                                    width={40}
                                    height={40}
                                    alt='Логотип'
                                />
                                <p className={styles.name}>{cmT('full-name')}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <p className={styles.conf}>{cmT('conf')}</p>
            </div>
        </div>
    )
}