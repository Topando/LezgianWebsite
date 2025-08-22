"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";

interface GlobalLightboxProps {
  slides: { src: string }[];
  galleryId: string;
}

export function GlobalLightbox({ slides, galleryId }: GlobalLightboxProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const galleryItem = target.closest(`[data-gallery="${galleryId}"]`);
      
      if (!galleryItem) return;
      
      const src = galleryItem.getAttribute("data-src");
      if (!src) return;
      
      // Нормализация URL для сравнения (удаление параметров)
      const normalizedSrc = src.split('?')[0];
      
      const index = slides.findIndex(slide => {
        const slideSrc = slide.src.split('?')[0];
        return slideSrc === normalizedSrc;
      });
      
      if (index !== -1) {
        setCurrentIndex(index);
        setOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [slides, galleryId]);

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={slides}
      index={currentIndex}
    />
  );
}