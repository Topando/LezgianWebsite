"use client"

import styles from './homepage.module.css';

import { PageSectionsNav } from '@/features/pageSections/pageSectionsNav';
import { SectionsMainPage } from '@/shared/sectionsMainPage';


export function HomepageContent () {

    return (
        <div>
          <PageSectionsNav sections={SectionsMainPage}/>
        </div>
    )
}
