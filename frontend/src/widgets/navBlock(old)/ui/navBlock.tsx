import styles from './navBlock.module.css';

import Link from 'next/link';

export function NavBlock () {
    return (
        <div className={styles.container}>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Календарь<br/>Мероприятий</Link>

                <div className={`${styles.leftTopArrow} ${styles.arrow}`}></div>
                <div className={`${styles.rightBottomArrow} ${styles.arrow}`}></div>
            </div>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Медиатека</Link>

                <div className={styles.horisontalLine}></div>
            </div>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Библиотека</Link>

                <div className={`${styles.leftBottomArrow} ${styles.arrow}`}></div>
                <div className={`${styles.rightTopArrow} ${styles.arrow}`}></div>
            </div>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Избранные<br/>публикации</Link>

                <div className={`${styles.leftTopArrow} ${styles.arrow}`}></div>
                <div className={`${styles.rightBottomArrow} ${styles.arrow}`}></div>
            </div>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Каталог Лезгинских<br/>интернет ресурсов</Link>

                <div className={styles.horisontalLine}></div>
            </div>

            <div className={`${styles.elem}`}>
                <Link href={'/'}>Памятные даты</Link>

                <div className={`${styles.leftBottomArrow} ${styles.arrow}`}></div>
                <div className={`${styles.rightTopArrow} ${styles.arrow}`}></div>
            </div>

        </div>
    )
}