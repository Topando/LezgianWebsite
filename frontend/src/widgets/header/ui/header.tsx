import {useTranslations} from 'next-intl';
import { LocaleSwitcher } from '@/widgets/LocaleSwitcher';
import Image from 'next/image';
import Link from 'next/link';


export function Header () {
    const cmT = useTranslations('common');
    const navT = useTranslations('nav.links');

    return (
        <header>
            <div>
                <div>
                    <Image 
                        src={'/images/logo.png'}
                        width={40}
                        height={40}
                        alt='Логотип'
                    />

                    <div>
                        <p>{cmT('full-name')}</p>
                        <p>{cmT('type-org')}</p>
                    </div>
                </div>

                <div>
                    <input type="text"></input>
                    <LocaleSwitcher/>
                </div>
            </div>

            <div>
                <Link href={'/'}>{navT('about-us')}</Link>
                <Link href={'/'}>{navT('congresses')}</Link>
                <Link href={'/'}>{navT('contacts')}</Link>
                <Link href={'/'}>{navT('reports')}</Link>
                <Link href={'/'}>{navT('projects')}</Link>
                <Link href={'/'}>{navT('docs')}</Link>
            </div>
        </header>
    )
}