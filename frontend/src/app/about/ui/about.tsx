"use client"

import styles from "./about.module.css";

import { useEffect, useState, useMemo} from "react";

import { MapDots } from "@/widgets/mapDots";
import { AboutType, aboutGet } from "@/shared/api/endpoints/about";
import { HtmlBlock } from "@/features/htmlBlock";
import { Separator } from "@/features/separator";
import { useRightNav } from '@/shared/context/RightNavContext';
import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';


export function AboutPage () {
    const [data, setData] = useState<AboutType[]>([]);
    const { setContent } = useRightNav();

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await aboutGet();
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

    return(
        <div className={styles.container}>
            <p className={styles.headerPage}>О нас</p>


            <div className={styles.itemsContent}>
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

            <MapDots/>
        </div>
    )
}