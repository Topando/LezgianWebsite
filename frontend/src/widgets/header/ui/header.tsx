import styles from './header.module.css';

import Image from 'next/image';

import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';

export function Header () {
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.search} placeholder='Поиск'></input>
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