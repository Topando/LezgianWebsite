"use client"

import styles from "./about.module.css";

import { MapDots } from "@/widgets/mapDots";


export function AboutPage () {
    return(
        <div className={styles.container}>
            <MapDots/>
        </div>
    )
}