'use client';

import { useEffect } from 'react';
import { useScrollSpy } from '@shared/hooks/useScrollSpy';
import { useRightNav } from '@/shared/context/RightNavContext';
import styles from './pageSectionsNav.module.css';

type Section = {
  id: string;
  label: string;
  link?: boolean;
};

export function PageSectionsNav({ sections }: { sections: Section[] }) {
  const activeSection = useScrollSpy(sections.map(s => s.id));
  const { setContent } = useRightNav();

  useEffect(() => {
    setContent(
      <div className={styles.container}>
        <nav className={styles.nav}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={section.link === true ? `${section.id}` : `#${section.id}`}
              className={`${styles.link} ${activeSection === section.id ? styles.active : ''}`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    );
    return () => setContent(null);
  }, [sections, activeSection, setContent]);

  return null;
}
