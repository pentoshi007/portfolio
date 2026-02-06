'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false });
const FloatingParticles = dynamic(() => import('./FloatingParticles'), { ssr: false });
const HexGrid = dynamic(() => import('./HexGrid'), { ssr: false });

export default function VisualEffects() {
  const [shouldRender, setShouldRender] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => setShouldRender(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldRender(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (prefersReducedMotion || !shouldRender) return null;

  return (
    <>
      <HexGrid />
      <MatrixRain />
      <FloatingParticles />
    </>
  );
}
