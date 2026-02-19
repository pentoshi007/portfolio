'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let intervalId: ReturnType<typeof setInterval>;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];=+-*&^%$#@!';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const buildGradients = () =>
      Array.from({ length: columns }, (_, i) => {
        const x = i * fontSize;
        const g = ctx.createLinearGradient(x, 0, x, fontSize * 5);
        g.addColorStop(0, 'rgba(0, 255, 170, 0)');
        g.addColorStop(1, 'rgba(0, 255, 170, 0.8)');
        return g;
      });

    let gradients = buildGradients();

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = gradients[i];
        ctx.fillText(char, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    intervalId = setInterval(draw, 66);

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        intervalId = setInterval(draw, 66);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, opacity: 0.2 }}
    />
  );
}
