'use client';

import { useEffect, useRef } from 'react';

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let lastFrame = 0;
    let paused = false;
    const FPS_INTERVAL = 1000 / 20;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const drawHex = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 255, 170, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const w = window.innerWidth;
    const h = window.innerHeight;

    const animate = (timestamp: number) => {
      if (paused) return;
      animationId = requestAnimationFrame(animate);

      const delta = timestamp - lastFrame;
      if (delta < FPS_INTERVAL) return;
      lastFrame = timestamp - (delta % FPS_INTERVAL);

      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      const hexSize = 30;
      const rows = Math.ceil(h / (hexSize * 1.5)) + 1;
      const cols = Math.ceil(w / (hexSize * Math.sqrt(3))) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexSize * Math.sqrt(3) + ((row % 2) * hexSize * Math.sqrt(3)) / 2;
          const y = row * hexSize * 1.5;

          const distance = Math.sqrt(
            Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
          );
          const wave = Math.sin(distance * 0.01 - time) * 0.5 + 0.5;
          const opacity = wave * 0.1;

          if (Math.random() > 0.995) {
            drawHex(x, y, hexSize, opacity + 0.2);
          } else {
            drawHex(x, y, hexSize, opacity);
          }
        }
      }
    };

    animationId = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(animationId);
      } else {
        paused = false;
        lastFrame = 0;
        animationId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 1 }}
    />
  );
}
