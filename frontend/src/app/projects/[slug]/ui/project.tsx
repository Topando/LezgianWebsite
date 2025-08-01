'use client';

import styles from './project.module.css';

interface Props {
  slug: string;
}

export default function ProjectPage({ slug }: Props) {

  return (
    <div className={styles.container}>
      {slug}
    </div>
  );
}
