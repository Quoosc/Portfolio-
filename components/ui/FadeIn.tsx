'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/** Server-rendered content stays visible even if JavaScript fails to load. */
export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        animation = element.animate([{ opacity: 0.7, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 420, delay: Math.min(delay, 0.24) * 1000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, [delay, reduceMotion]);
  return <div ref={ref} className={className}>{children}</div>;
}
