import styles from './mapDots.module.css';

import Image from 'next/image';
import { useState } from 'react';


export function MapDots() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    return (
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
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
  
        {hoveredIndex !== null && (
          <div
            className={styles.modalDot}
            style={{
              left: `${points[hoveredIndex].x}%`,
              top: `${points[hoveredIndex].y}%`,
            }}
          >
            <p className={styles.headerDot}>Название</p>
            <p className={styles.descDot}>Описание</p>
          </div>
        )}
      </div>
    );
  }
  

const points = [
    {x: 8, y: 58},
    {x: 17, y: 50},
    {x: 24, y: 38},
    {x: 23, y: 65},
    {x: 31, y: 54},
    {x: 35, y: 38},
    {x: 43, y: 54},
    {x: 37, y: 72},
    {x: 49, y: 65},
    {x: 52, y: 85},
    {x: 55.5, y: 66},
    {x: 60, y: 78},
    {x: 62, y: 42},
    {x: 64, y: 56},
    {x: 67.5, y: 68},
    {x: 72, y: 48},
    {x: 80, y: 32},
    {x: 81, y: 75},
]