'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type RightNavContextType = {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
};

export const RightNavContext = createContext<RightNavContextType>({
  content: null,
  setContent: () => {},
});

export function RightNavProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <RightNavContext.Provider value={{ content, setContent }}>
      {children}
    </RightNavContext.Provider>
  );
}

export function useRightNav() {
  const context = useContext(RightNavContext);
  if (!context) {
    throw new Error('useRightNav must be used within a RightNavProvider');
  }
  return context;
}