import styles from './htmlBlock.module.css';

import { parseBody } from "@/features/parseAlbumImg/parseAlbumImg";

interface Props {
    body?: string;
  }

export function HtmlBlock ({ body='' }: Props) {

    return (
        <div className={styles.content}>
            {parseBody(body, styles)}
        </div>
    )
}