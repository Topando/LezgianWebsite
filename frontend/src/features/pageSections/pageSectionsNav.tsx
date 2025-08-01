// features/pageSections/PageSectionsNav.tsx
'use client';

import { useScrollSpy } from '@shared/hooks/useScrollSpy';
import styles from './pageSectionsNav.module.css';

type Section = {
  id: string;
  label: string;
};

export function PageSectionsNav({ sections }: { sections: Section[] }) {
  const activeSection = useScrollSpy(sections.map(s => s.id));

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`${styles.link} ${activeSection === section.id ? styles.active : ''}`}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}