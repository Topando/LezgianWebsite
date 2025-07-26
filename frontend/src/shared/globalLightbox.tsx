"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

      if (target.tagName === "IMG" && target.closest(`[data-gallery="${galleryId}"]`)) {
        const src = (target as HTMLImageElement).src;

        const index = slides.findIndex((s) => s.src === src);
        if (index !== -1) {
          setCurrentIndex(index);
          setOpen(true);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
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
