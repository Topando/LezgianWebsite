import styles from './header.module.css';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';

export function Header () {
    const cT = useTranslations('common');

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.search} placeholder={cT('search')}></input>
                <button>
                    <Image
                        className={styles.searchButton} 
                        src={'/images/search-icon.svg'}
                        width={30}
                        height={30}
                        alt='Поиск'
                    />
                </button>
            </div>
            <LocaleSwitcher/>
        </div>
    )
}