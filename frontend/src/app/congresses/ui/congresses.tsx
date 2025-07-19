// app/congresses/ui/Congresses.tsx
"use client"

import styles from "./congresses.module.css";

import { useEffect, useState, useMemo } from "react";

import { CongressesType, congressesGet } from "@/shared/api/endpoints/congresses";
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { HtmlBlock } from "@/features/htmlBlock";
import { Separator } from "@/features/separator";

export function Congresses() {
  const [data, setData] = useState<CongressesType[]>([]);

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

  return (
    <div className={styles.container}>
      <PageSectionsNav sections={sections}/>

      <p className={styles.headerPage}>Съезды</p>

      {data.map((elem, ind) => (
        <div key={ind} id={`${ind}`} className={styles.item}>
          <Separator/>

          <p className={styles.elemHeader}>{elem.title}</p>
          <div className={styles.content}>
            <HtmlBlock body={elem.body}/>
          </div>
        </div>
      ))}
    </div>
  );
}
