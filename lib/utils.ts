let cancelCurrentScroll: (() => void) | undefined;

/** One cancellable scroll at a time; no nested native smooth scrolling. */
export function scrollToSection(id: string, options: { focus?: boolean } = {}) {
  cancelCurrentScroll?.();
  const element = document.getElementById(id);
  if (!element) return;
  const target: HTMLElement = element;
  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 80;
  const start = window.scrollY;
  const end = Math.max(0, Math.min(start + target.getBoundingClientRect().top - margin,
    document.documentElement.scrollHeight - window.innerHeight));
  const distance = end - start;
  let frame = 0;
  let startTime: number | undefined;
  function cleanup() {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', onKeyDown);
    if (cancelCurrentScroll === cancel) cancelCurrentScroll = undefined;
  }
  function cancel() { cleanup(); }
  function onKeyDown(event: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) cancel();
  }
  function finish() {
    cleanup();
    if (options.focus) {
      const focusTarget = target.querySelector<HTMLElement>('h1, h2') ?? target;
      const originalTabIndex = focusTarget.getAttribute('tabindex');
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({ preventScroll: true });
      focusTarget.addEventListener('blur', () => {
        if (originalTabIndex === null) focusTarget.removeAttribute('tabindex');
        else focusTarget.setAttribute('tabindex', originalTabIndex);
      }, { once: true });
    }
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 1) {
    window.scrollTo({ top: end, behavior: 'instant' });
    finish();
    return;
  }
  const duration = Math.min(850, Math.max(300, Math.abs(distance) * 0.4));
  function step(time: number) {
    startTime ??= time;
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo({ top: start + distance * (1 - (1 - progress) ** 3), behavior: 'instant' });
    if (progress < 1) frame = requestAnimationFrame(step);
    else finish();
  }
  cancelCurrentScroll = cancel;
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  frame = requestAnimationFrame(step);
}
