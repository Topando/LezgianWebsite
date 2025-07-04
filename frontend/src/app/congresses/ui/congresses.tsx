// app/congresses/ui/Congresses.tsx
"use client"

import styles from "./congresses.module.css";
import { useEffect, useState, useMemo } from "react";
import { CongressesType, congressesGet } from "@/shared/api/endpoints/congresses";
import { useRightNav } from '@/shared/context/RightNavContext';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { parseBody } from "@/features/parseAlbumImg/parseAlbumImg";

export function Congresses() {
  const [data, setData] = useState<CongressesType[]>([]);
  const { setContent } = useRightNav();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await congressesGet();
        setData(response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const sections = useMemo(() => {
    return data.map((item, index) => ({
      id: `${index}`,
      label: item.menu_title,
    }));
  }, [data]);

  useEffect(() => {
    setContent(<PageSectionsNav sections={sections} />);
    return () => setContent(null);
  }, [sections, setContent]);

  return (
    <div className={styles.container}>
      <p className={styles.headerPage}>Съезды</p>

      {data.map((elem, ind) => (
        <div key={ind} id={`${ind}`} className={styles.item}>
          <div className={styles.separator}></div>
          <p className={styles.elemHeader}>{elem.title}</p>
          <div className={styles.content}>
            {parseBody(elem.body, styles)}
          </div>
        </div>
      ))}
    </div>
  );
}
