/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_TRANSITION_MS = 550;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(current ?? 'dark');
  }, []);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const current = (document.documentElement.dataset.theme as Theme | undefined) ?? 'dark';
    const next: Theme = current === 'dark' ? 'light' : 'dark';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition = typeof document.startViewTransition === 'function';

    if (reduceMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    if (!supportsViewTransition || !origin) {
      const root = document.documentElement;
      root.classList.add('theme-color-transition');
      window.requestAnimationFrame(() => {
        applyTheme(next);
        setTheme(next);
        window.setTimeout(() => root.classList.remove('theme-color-transition'), THEME_TRANSITION_MS);
      });
      return;
    }

    const endRadius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y),
    );

    const transition = document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${endRadius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: THEME_TRANSITION_MS,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    }).catch(() => undefined);
  }, []);

  return { theme, toggleTheme };
}
