'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './partnersSlider.module.css';

const tempUrl = [
  '/tempStorage/1.png',
  '/tempStorage/2.png',
  '/tempStorage/3.png',
  '/tempStorage/4.png',
  '/tempStorage/5.png',
  '/tempStorage/6.png',
];

export function PartnersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1000px)');
    const apply = () => setIsMobile(mql.matches);
    apply();

    if (mql.addEventListener) mql.addEventListener('change', apply);
    else mql.addListener(apply);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', apply);
      else mql.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (!isMobile) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      el.scrollLeft = 0;
      return;
    }

    let pos = el.scrollLeft || 0;
    let dir: 1 | -1 = 1;
    let prevTs: number | null = null;
    const speed = 0.08;

    const getMax = () => Math.max(0, el.scrollWidth - el.clientWidth);

    function step(ts: number) {
      if (prevTs !== null) {
        let dt = ts - prevTs;
        if (dt > 50) dt = 50;
        pos += dir * speed * dt;

        const max = getMax();
        if (pos >= max) {
          pos = max;
          dir = -1;
        } else if (pos <= 0) {
          pos = 0;
          dir = 1;
        }
        el.scrollLeft = pos;
      }
      prevTs = ts;
      frameRef.current = requestAnimationFrame(step);
    }

    frameRef.current = requestAnimationFrame(step);

    const onResize = () => {
      const max = getMax();
      if (pos > max) pos = max;
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <div ref={scrollRef} className={`${styles.scroll} ${isMobile ? styles.isMobile : ''}`}>
        {tempUrl.map((url, i) => (
          <div key={i} className={styles.item}>
            <Image src={url} width={50} height={50} alt="Партнер" />
          </div>
        ))}
      </div>
    </div>
  );
}
