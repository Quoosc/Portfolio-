'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const scrollPadding =
        Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80;
      const activationLine = window.scrollY + scrollPadding + 16;
      let currentId = ids[0] ?? '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const scrollMargin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
        const sectionTop = element.getBoundingClientRect().top + window.scrollY - scrollMargin;
        if (sectionTop <= activationLine) currentId = id;
        else break;
      }

      if (currentId) setActiveId(currentId);
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('popstate', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.removeEventListener('popstate', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}
