'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { PageTitle, useFirstPathSegment } from '@/features/pageTitle/pageTitle';

import styles from './leftNav.module.css';

export function LeftNav() {
  const cmT = useTranslations('common');
  const navT = useTranslations('nav.links');

  const [isOpen, setIsOpen] = useState(false);
  const firstPathSegment = useFirstPathSegment();

  return (
    <nav className={`${styles.header} ${isOpen ? styles.open : ''}`}>
      <div className={styles.mobileNav}>
        <p className={styles.pageName}><PageTitle/></p>

        <button onClick={() => setIsOpen(!isOpen)} className={styles.buttonHam}>
              <Image
                  className={`${styles.hamburgerBut} ${isOpen? styles.open:styles.close}`}
                  src="/images/navIcons/close.svg"
                  width={30}
                  height={30}
                  alt="Закрыть меню"
              />
              <Image
                  className={`${styles.hamburgerBut} ${!isOpen? styles.open:styles.close}`}
                  src={'/images/navIcons/hamburger.svg'}
                  width={40}
                  height={40}
                  alt='Открыть меню'
              />
        </button>

        
      </div>

      <div className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}>

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
          {[
            { href: '/', label: navT('main'), icon: 'main' },
            { href: '/about', label: navT('about-us'), icon: 'about' },
            { href: '/docs', label: navT('docs'), icon: 'docs' },
            { href: '/projects', label: navT('projects'), icon: 'projects' },
            { href: '/congresses', label: navT('congresses'), icon: 'congress' },
            { href: '/contacts', label: navT('contacts'), icon: 'contacts' },
            { href: '/reports', label: navT('reports'), icon: 'reports' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLinkContainer} ${firstPathSegment==link.href ? styles.navLinkContainerActive:''}`}
              onClick={() => setIsOpen(false)}
            >
              <Image
                className={styles.navImage}
                src={`/images/navIcons/${link.icon}.svg`}
                width={30}
                height={30}
                alt={link.label}
              />
              <p>{link.label}</p>
            </Link>
          ))}
        </div>

        <div className={styles.socNetwork}>
          {['vk', 'telegram', 'rutube'].map((network) => (
            <Link key={network} href={'/'}>
              <Image
                className={styles.imageNetwork}
                src={`/images/linksNetwork/${network}.svg`}
                width={40}
                height={40}
                alt={network}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
