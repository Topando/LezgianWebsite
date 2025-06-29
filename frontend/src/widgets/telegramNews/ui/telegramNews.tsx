import styles from './telegramNews.module.css';

import Parser from "rss-parser";


interface NewsItem {
    text: string;
    url: string;
};
  

export async function getStaticProps() {
    const parser = new Parser();
    const feed = await parser.parseURL('https://rsshub.app/telegram/channel/flnka?limit=15');

    return {
        props: {
            news: feed.items,
        },
        revalidate: 60 * 60 * 4,
    };
}


export function News({news}:{news: NewsItem[]}) {
    return (
        <div className={styles.container}>
            {news.map((item, ind)=> (
                <div className={styles.newsElem} key={ind}>

                </div>
            ))}
        </div>
    )
}