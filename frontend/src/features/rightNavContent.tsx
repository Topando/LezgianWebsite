'use client';

import { useEffect } from 'react';
import { useRightNav } from '@shared/context/RightNavContext';

export function SetRightNavContent({ content }: { content: React.ReactNode }) {
  const { setContent } = useRightNav();

  useEffect(() => {
    setContent(content);
    return () => setContent(null);
  }, [content, setContent]);

  return null;
}