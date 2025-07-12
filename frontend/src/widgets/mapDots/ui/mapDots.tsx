'use client';

import styles from './mapDots.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function MapDots() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null); // ✨ ref на внешний контейнер

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);

      if (isMobile && outerRef.current) {
        const width = outerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
      }
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!mobile) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.9,
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [mobile]);

  return (
    <div ref={outerRef}>
      <div className={styles.container}>
        <img
          src="/images/other/mapDots.png"
          alt="map"
          className={styles.mapImage}
        />

        {points.map((point, i) => (
          <div
            key={i}
            className={styles.mapDot}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              opacity: mobile ? (i === activeIndex ? 1 : 0.3) : 1,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={() => !mobile && setHoveredIndex(i)}
            onMouseLeave={() => !mobile && setHoveredIndex(null)}
          />
        ))}

        {!mobile && hoveredIndex !== null && (
          <div
            className={styles.modalDot}
            style={{
              left: `${points[hoveredIndex].x}%`,
              top: `${points[hoveredIndex].y}%`,
            }}
          >
            <p className={styles.headerDot}>{points[hoveredIndex].name}</p>
            <p className={styles.descDot}>{points[hoveredIndex].desc}</p>
          </div>
        )}
      </div>

      {mobile && (
        <div
          className={styles.mobileDescContainer}
          ref={containerRef}
          style={{ width: containerWidth }}
        >
          {points.map((elem, ind) => (
            <div
              className={styles.elemDesc}
              key={ind}
              data-index={ind}
              ref={(el) => (itemRefs.current[ind] = el)}
            >
              <p className={styles.mobileName}>{elem.name}</p>
              <p className={styles.mobileDesc}>{elem.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const points = [
  { x: 8, y: 58, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 17, y: 50, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 24, y: 38, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 23, y: 65, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 31, y: 54, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 35, y: 38, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 43, y: 54, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 37, y: 72, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 49, y: 65, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 52, y: 85, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 55.5, y: 66, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 60, y: 78, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 62, y: 42, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 64, y: 56, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 67.5, y: 68, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 72, y: 48, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 80, y: 32, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
  { x: 81, y: 75, name: 'Название', desc: 'Описание Описание Описание Описание ОписаниеОписание Описание Описание' },
];
