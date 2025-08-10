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
            <p className={styles.descDot}>Юридический адрес {points[hoveredIndex].address}</p>
            <p className={styles.descDot}>Руководитель {points[hoveredIndex].desc}</p>
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
              <p className={styles.mobileDesc}>Юридический адрес {elem.address}</p>
              <p className={styles.mobileDesc}>Руководитель {elem.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const points = [
  { x: 7, y: 30, name: 'ЗМОО “Лезгинская Национально-Культурная Автономия” ЗЕЛЕНОГРАДСКАЯ МЕСТНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Нюдюрбегов Асан Нюдюрбегович', address: '238530, Калининградская область, Зеленоградский район, город Зеленоградск, Крымская ул., д.5' },
  { x: 14.5, y: 47, name: 'РЕГИОНАЛЬНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ “МОСКОВСКИЕ ЛЕЗГИНЫ”', desc: 'Магомед-Эминов Мадрудин Шамсудинович', address: '115035, город Москва, ул. Большая Ордынка, д. 19 стр. 1, э/пом/ ком 1/IV/3'  },
  { x: 17, y: 44.5, name: 'МЕСТНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ “ЛЕЗГИНЫ”', desc: 'Бейбалаев Ишрефбег Рамизович', address: '117461, город Москва, ул. Каховка, д. 18 к. 1, кв. 180'  },
  { x: 18.5, y: 43.5, name: 'ОО “ЛНКАГТЯО” ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ ГОРОДА ТУТАЕВА ЯРОСЛАВСКОЙ ОБЛАСТИ”', desc: 'Шихвердиев Радик Гюльметович', address: '152300, Ярославская область, Тутаевский район, город Тутаев, Комсомольская ул., д.46, кв.3'  },
  { x: 22, y: 46, name: 'ВГОО “ЛНКА” ВОЛОГОДСКАЯ ГОРОДСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Оруджев Физули Сабирович', address: '160029, Вологодская область, город Вологда, ул. Горького, д. 132, кв. 73'  },
  { x: 17.5, y: 47.5, name: 'ОО “ЯРЛНКА” ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЯРОСЛАВСКАЯ РЕГИОНАЛЬНАЯ ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Агасиев Рамиз Агакишиевич', address: '150001, Ярославская область, город Ярославль, Мельничная ул., д.18, кв. 1'  },
  { x: 40.5, y: 57, name: 'ГОО “Муравленковская МЛНКА” МУРАВЛЕНКОВСКАЯ ГОРОДСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “МЕСТНАЯ ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Яралиев Альберт Сеферович', address: '629601, Ямало-Ненецкий автономный округ, г Муравленко, Школьная ул, д. 30а'  },
  { x: 43.5, y: 59.5, name: 'ГОО “Ноябрьская МЛНКА” НОЯБРЬСКАЯ ГОРОДСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “МЕСТНАЯ ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Гусейханов Арсен Энверович', address: '629000, Ямало-Ненецкий автономный округ, г Ноябрьск, тер. Промузел Пелей, Панель XII'  },
  { x: 32, y: 67, name: 'МОО ЛНКА Г.Тюмени МЕСТНАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ Г. ТЮМЕНИ”', desc: 'Алимов Чигали Музафеддинович', address: '625039, Тюменская область, г Тюмень, Одесская ул, д. 32'  },
  { x: 10, y: 74, name: 'ОО МЛНК Г. Махачкалы ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ - МЕСТНАЯ ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО - КУЛЬТУРНАЯ АВТОНОМИЯ Г. МАХАЧКАЛЫ', desc: 'Рагимханова Пакизат Нажмудиновна', address: '367029, Республика Дагестан, город Махачкала, ул Абдулхакима Исмаилова, д. 23а, кв. 94'  },
  { x: 8, y: 80, name: 'ОО МЛНКА Г. Дербента ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ - МЕСТНАЯ ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ Г. ДЕРБЕНТА', desc: 'Фетуллаев Низами Аллахвердиевич', address: '368608, Республика Дагестан, город Дербент, ул. Курбанова С.Д., д. 27, кв. 8'  },
  { x: 6, y: 68, name: 'СГОО “Лезгинская Национально-Культурная Автономия” СТАВРОПОЛЬСКАЯ ГОРОДСКАЯ ОБЩЕСТВЕННАЯ ОРГАНИЗАЦИЯ “ЛЕЗГИНСКАЯ НАЦИОНАЛЬНО-КУЛЬТУРНАЯ АВТОНОМИЯ”', desc: 'Селимов Магомед Асланович', address: '355008, Ставропольский край, г Ставрополь, ул Орджоникидзе, д. 2/1'}
]