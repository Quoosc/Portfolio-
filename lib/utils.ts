function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * Scrolls to a section by id with a hand-rolled rAF animation instead of
 * native `scrollIntoView`/CSS `scroll-behavior: smooth` — those get their
 * animation silently cancelled on some Android Chrome / devtool device
 * emulation setups, leaving the page stuck in place despite the URL hash
 * changing. Duration scales with distance so short and long hops both feel
 * natural instead of using one fixed speed.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`);
  }

  const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const startY = window.scrollY;
  const targetY = Math.max(0, startY + target.getBoundingClientRect().top - scrollMarginTop);
  const distance = targetY - startY;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || distance === 0) {
    window.scrollTo(0, targetY);
    return;
  }

  const duration = Math.min(1000, Math.max(400, Math.abs(distance) * 0.6));
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
