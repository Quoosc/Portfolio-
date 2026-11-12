'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const scrollPadding =
        Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--section-offset')) || 80;
      const activationLine = window.scrollY + scrollPadding + 16;
      let currentId = '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const sectionTop = element.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= activationLine) currentId = id;
        else break;
      }

      if (pathname === '/' && window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) currentId = ids.at(-1) ?? currentId;
      setActiveId(pathname === '/' ? currentId : '');
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('popstate', scheduleUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.removeEventListener('popstate', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, pathname]);

  return activeId;
}
