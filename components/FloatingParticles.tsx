'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  char: string;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let lastFrame = 0;
    let paused = false;
    const FPS_INTERVAL = 1000 / 24;

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

    const chars = ['<', '>', '{', '}', '[', ']', '/', '\\', '|', '_', '-', '+', '0', '1', '#', '$', '@', '*'];
    const particles: Particle[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 12 + 10,
        opacity: Math.random() * 0.4 + 0.2,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    const animate = (timestamp: number) => {
      if (paused) return;
      animationId = requestAnimationFrame(animate);

      const delta = timestamp - lastFrame;
      if (delta < FPS_INTERVAL) return;
      lastFrame = timestamp - (delta % FPS_INTERVAL);

      ctx.clearRect(0, 0, w, h);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > w) particle.vx *= -1;
        if (particle.y < 0 || particle.y > h) particle.vy *= -1;

        ctx.font = `${particle.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(0, 255, 170, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      });
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
      className="fixed inset-0 pointer-events-none opacity-100"
      style={{ zIndex: 2 }}
    />
  );
}
