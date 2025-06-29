import {useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import styles from './leftNav.module.css';


export function LeftNav () {
    const cmT = useTranslations('common');
    const navT = useTranslations('nav.links');

    return (
        <nav className={styles.header}>
            <div>
                <div className={styles.comInfo}>
                    <Image 
                        className={styles.logo}
                        src={'/images/logo.png'}
                        width={40}
                        height={40}
                        alt='Логотип'
                    />

                    <div>
                        <p className={styles.name}>{cmT('full-name')}</p>
                    </div>
                </div>


                <div className={styles.nav}>
                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image
                            className={styles.navImage} 
                            src={'/images/navIcons/main.svg'}
                            width={30}
                            height={30}
                            alt='Главная'
                        />
                        <p>{navT('main')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/about.svg'}
                            width={30}
                            height={30}
                            alt='О нас'
                        />
                        <p>{navT('about-us')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/docs.svg'}
                            width={30}
                            height={30}
                            alt='Документы'
                        />
                        <p>{navT('docs')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/projects.svg'}
                            width={30}
                            height={30}
                            alt='Проекты'
                        />
                        <p>{navT('projects')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/congress.svg'}
                            width={30}
                            height={30}
                            alt='Съезды'
                        />
                        <p>{navT('congresses')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/contacts.svg'}
                            width={30}
                            height={30}
                            alt='Контакты'
                        />
                        <p>{navT('contacts')}</p>
                    </Link>

                    <Link href={'/'} className={styles.navLinkContainer}>
                        <Image 
                            className={styles.navImage}
                            src={'/images/navIcons/reports.svg'}
                            width={30}
                            height={30}
                            alt='Отчеты'
                        />
                        <p>{navT('reports')}</p>
                    </Link>
                </div>

                <div className={styles.socNetwork}>
                    <Link href={'/'}>
                        <Image
                            className={styles.imageNetwork}
                            src={'/images/linksNetwork/vk.svg'}
                            width={40}
                            height={40}
                            alt='Группа vk'
                        ></Image>
                    </Link>
                    <Link href={'/'}>
                        <Image
                            className={styles.imageNetwork}
                            src={'/images/linksNetwork/telegram.svg'}
                            width={40}
                            height={40}
                            alt='Группа vk'
                        ></Image>
                    </Link>
                    <Link href={'/'}>
                        <Image
                            className={styles.imageNetwork}
                            src={'/images/linksNetwork/rutube.svg'}
                            width={40}
                            height={40}
                            alt='Группа vk'
                        ></Image>
                    </Link>
                </div>
                {/* 
                <div className={styles.containerFunc}>
                    <div>
                        <div className={styles.searchField}>
                            <input type="text"></input>
                            <button>
                                <Image
                                    src={'/images/search-icon.svg'}
                                    width={30}
                                    height={30}
                                    alt='Поиск'
                                />
                            </button>
                        </div>
                        <LocaleSwitcher/>
                    </div>
                </div>
                */}
            </div>

            
        </nav>
    )
}