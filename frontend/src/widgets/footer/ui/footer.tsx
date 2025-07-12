'use client'

import styles from './footer.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';

import { Contacts, contacts } from '@/shared/api/endpoints/contacts';
import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';

export function Footer() {
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

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={`${styles.block} ${styles.navBlock}`}>
                    <p className={styles.title}>Навигация</p>
                    <div className={styles.content}>
                        <Link href='/'>Главная</Link>
                        <Link href=''>О нас</Link>
                        <Link href=''>Документы</Link>
                        <Link href=''>Проекты</Link>
                        <Link href=''>Съезды</Link>
                        <Link href=''>Контакты</Link>
                        <Link href=''>Отчеты</Link>
                    </div>
                </div>
                <div className={`${styles.block} ${styles.addressBlock}`}>
                    <p className={styles.title}>Адрес</p>
                    <div className={styles.content}>
                        <p>Москва, Россия</p>
                        <a href={`mailto:${data?.email}`}>{data?.email}</a>
                        <p>+7 (495) 123-45-67</p>

                        <div>
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

                <div className={`${styles.block} ${styles.socBlock}`}>
                    <p className={styles.title}>Социальные сети</p>

                    <div className={styles.content}>
                        <div className={styles.networksWrapper}>
                            <div className={styles.networkElem}>
                                <Image className={styles.imageNetwork} src={'/images/linksNetwork/vk.svg'} width={40} height={40} alt='Группа vk'/>
                                <a href="">Вконтакте</a>
                            </div>
                            <div className={styles.networkElem}>
                                <Image className={styles.imageNetwork} src={'/images/linksNetwork/telegram.svg'} width={40} height={40} alt='telegram'/>
                                <a href="">Телеграм</a>
                            </div>
                            <div className={styles.networkElem}>
                                <Image className={styles.imageNetwork} src={'/images/linksNetwork/rutube.svg'} width={40} height={40} alt='rutube'/>
                                <a href="">Рутюб</a>
                            </div>
                        </div>

                        <div className={styles.localeSwitch}>
                            <LocaleSwitcher theme='black'/>
                        </div>
                    </div>
                </div>

            </div>

            <p className={styles.conf}>© 2025 ФЛНКА. Все права защищены. Политика конфиденциальности</p>
        </div>
    )
}