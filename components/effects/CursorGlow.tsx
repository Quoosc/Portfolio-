'use client';

import { useEffect, useRef } from 'react';

type Blob = {
  radius: number;
  orbitX: number;
  orbitY: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  colorVar: '--color-accent' | '--color-accent-2';
  darkAlpha: number;
  lightAlpha: number;
};

const BLOBS: Blob[] = [
  {
    radius: 260,
    orbitX: 40,
    orbitY: 30,
    phaseX: 0,
    phaseY: 0,
    speedX: 0.6,
    speedY: 0.5,
    colorVar: '--color-accent',
    darkAlpha: 0.2,
    lightAlpha: 0.3,
  },
  {
    radius: 190,
    orbitX: 55,
    orbitY: 40,
    phaseX: 1.3,
    phaseY: 2.1,
    speedX: 0.4,
    speedY: 0.7,
    colorVar: '--color-accent-2',
    darkAlpha: 0.17,
    lightAlpha: 0.24,
  },
];

const EASE = 0.06;

function hexToRgb(hex: string) {
  const value = hex.trim().replace('#', '');
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  const int = parseInt(normalized, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const pointer = { x: width / 2, y: height / 2, active: false };
    const eased = { x: width / 2, y: height / 2 };

    function handlePointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }
    function handlePointerLeave() {
      pointer.active = false;
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    let t = 0;
    let raf = 0;
    function tick() {
      t += 0.016;
      eased.x += (pointer.x - eased.x) * EASE;
      eased.y += (pointer.y - eased.y) * EASE;

      ctx!.clearRect(0, 0, width, height);

      if (pointer.active) {
        const isDark = document.documentElement.dataset.theme !== 'light';
        ctx!.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

        const rootStyles = getComputedStyle(document.documentElement);
        const opacity = parseFloat(rootStyles.getPropertyValue('--cursor-glow-opacity')) || 1;

        for (const blob of BLOBS) {
          const colorHex = rootStyles.getPropertyValue(blob.colorVar) || '#22d3ee';
          const { r, g, b } = hexToRgb(colorHex);
          const alpha = (isDark ? blob.darkAlpha : blob.lightAlpha) * opacity;
          const x = eased.x + Math.sin(t * blob.speedX + blob.phaseX) * blob.orbitX;
          const y = eased.y + Math.cos(t * blob.speedY + blob.phaseY) * blob.orbitY;

          const gradient = ctx!.createRadialGradient(x, y, 0, x, y, blob.radius);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx!.fillStyle = gradient;
          ctx!.fillRect(x - blob.radius, y - blob.radius, blob.radius * 2, blob.radius * 2);
        }

        ctx!.globalCompositeOperation = 'source-over';
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
