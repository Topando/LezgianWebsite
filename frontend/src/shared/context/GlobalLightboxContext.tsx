// GlobalLightboxContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Slide = { src: string };

interface GlobalLightboxContextType {
  openLightbox: (index: number) => void;
  registerSlides: (slides: Slide[]) => void;
}

const GlobalLightboxContext = createContext<GlobalLightboxContextType | null>(null);

export function GlobalLightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  const openLightbox = useCallback((i: number) => {
    if (slides.length === 0) {
      console.warn("GlobalLightbox: opening with empty slides");
    }
    setIndex(i);
    setOpen(true);
  }, [slides]);
  
  const registerSlides = useCallback((newSlides: Slide[]) => {
    setSlides(newSlides);
  }, []);

  return (
    <GlobalLightboxContext.Provider value={{ openLightbox, registerSlides }}>
      {children}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />
    </GlobalLightboxContext.Provider>
  );
}

export function useGlobalLightbox() {
  const ctx = useContext(GlobalLightboxContext);
  if (!ctx) throw new Error("useGlobalLightbox must be used within GlobalLightboxProvider");
  return ctx;
}
