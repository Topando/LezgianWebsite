'use client';

import styles from './historySlider.module.css';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


type Slide = {
    image: string;
    title: string;
  };
  
  interface HistoryCarouselProps {
    slides: Slide[];
  }
  
  const Slides = [
      {
          image:'/tempStorage/ourProj.png',
          title: 'Дагестанская ACCP, Ахтынский район 1962 г.',
      },
      {
          image:'/tempStorage/ourProj.png',
          title: 'Дагестанская ACCP, Ахтынский район 1962 г.',
      },
      {
          image:'/tempStorage/ourProj.png',
          title: 'Дагестанская ACCP, Ахтынский район 1962 г.',
      },
      {
          image:'/tempStorage/ourProj.png',
          title: 'Дагестанская ACCP, Ахтынский район 1962 г.',
      },
  ];

export function HistorySlider ({ slides=Slides }: HistoryCarouselProps) {
    const [current, setCurrent] = useState(0);
    const len = slides.length;
    const nextIndex = (current + 1) % len;
    const prevIndex = (current - 1 + len) % len;


    useEffect(() => {
        [slides[nextIndex].image, slides[prevIndex].image].forEach((src) => {
          const img = new window.Image();
          img.src = src;
        });
      }, [current, slides, nextIndex, prevIndex]);
    
    const goNext = () => setCurrent(nextIndex);
    const goPrev = () => setCurrent(prevIndex);

    return (
        <div className={styles.carousel}>
            <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={goPrev}
                aria-label="Previous"
            >
                <Image src={'/images/arrow.svg'} width={40} height={40} alt='Предыдущий'/>
            </button>
            <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={goNext}
                aria-label="Next"
            >
                <Image src={'/images/arrow.svg'} width={40} height={40} alt='Следующий'/>
            </button>

            <div className={styles.processBar}>
                {slides.map((elem, ind) => (
                <div key={ind} className={`${styles.circle} ${ind===current? styles.currentCircle: ''}`}></div>
                ))}
            </div>


            {/* Анимация фонового изображения */}
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={current}
                    className={styles.backgroundWrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className={styles.backgroundImage}
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Анимация контента */}
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={current}
                    className={styles.content}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.headline}>{slides[current].title}</h2>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}