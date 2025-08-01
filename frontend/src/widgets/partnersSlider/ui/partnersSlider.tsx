'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './partnersSlider.module.css';

const tempUrl = [
  '/tempStorage/1.png',
  '/tempStorage/2.png',
  '/tempStorage/3.png',
  '/tempStorage/4.png',
  '/tempStorage/5.png',
  '/tempStorage/6.png',
  '/tempStorage/7.png',
];

export function PartnersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = 0.08; 
  const frame = useRef<number>();
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    //исходная ширина набора
    const originals = Array.from(el.children) as HTMLElement[];
    const origWidth = originals.reduce((sum, ch) => {
      const mr = parseFloat(getComputedStyle(ch).marginRight);
      return sum + ch.offsetWidth + mr;
    }, 0);

    //дублируем пока не заполним 
    let appended = 0, idx = 0;
    while (appended < origWidth) {
      const clone = originals[idx % originals.length].cloneNode(true) as HTMLElement;
      el.appendChild(clone);
      const mr = parseFloat(getComputedStyle(clone).marginRight);
      appended += clone.offsetWidth + mr;
      idx++;
    }

    const maxScroll = origWidth; 
    let pos = 0;
    let dir = 1; 
    let prevTs: number | null = null;

    function step(ts: number) {
      if (prevTs !== null) {
        let dt = ts - prevTs;
        if (dt > 50) dt = 50;

        pos += dt * speed * dir;
        if (pos >= maxScroll) {
          pos = maxScroll;
          dir = -1;
        } else if (pos <= 0) {
          pos = 0;
          dir = 1;
        }

        el.scrollLeft = pos;
      }
      prevTs = ts;
      frame.current = requestAnimationFrame(step);
    }

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={scrollRef} className={styles.scroll}>
        {tempUrl.map((url, i) => (
          <div key={i} className={styles.item}>
            <Image src={url} width={50} height={50} alt="Партнер" />
          </div>
        ))}
      </div>
    </div>
  );
}
