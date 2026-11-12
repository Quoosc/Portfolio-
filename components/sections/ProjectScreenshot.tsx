'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon, ArrowsOutIcon } from '@phosphor-icons/react';
import { ScreenshotImage } from '@/components/projects/ScreenshotImage';
import type { ProjectImage } from '@/data/projects';

export function ProjectScreenshot({ images, projectName, variant = 'grid' }: {
  images: ProjectImage[]; projectName: string; variant?: 'compact' | 'grid';
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const current = images[index];

  function originTransform(dialog: HTMLDialogElement) {
    const source = triggerRef.current?.querySelector('img') ?? triggerRef.current;
    if (!source?.isConnected) return 'translateY(8px) scale(0.98)';
    const from = source.getBoundingClientRect();
    const to = dialog.getBoundingClientRect();
    // If the trigger moved outside the viewport, use a short, local exit.
    if (from.bottom < 0 || from.top > innerHeight) return 'translateY(8px) scale(0.98)';
    return `translate(${from.left + from.width / 2 - to.left - to.width / 2}px, ${from.top + from.height / 2 - to.top - to.height / 2}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  }

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (reduceMotion) {
      if (closingRef.current) dialog.close();
      return;
    }
    animationRef.current = dialog.animate(
      [{ transform: originTransform(dialog), opacity: 0.45 }, { transform: 'none', opacity: 1 }],
      { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    return () => { animationRef.current?.cancel(); };
  }, [open, reduceMotion]);

  function closeViewer() {
    const dialog = dialogRef.current;
    if (!dialog || closingRef.current) return;
    closingRef.current = true;
    const currentStyle = getComputedStyle(dialog);
    const start = { transform: currentStyle.transform, opacity: currentStyle.opacity };
    animationRef.current?.cancel();
    if (reduceMotion) { dialog.close(); return; }
    const animation = dialog.animate(
      [start, { transform: originTransform(dialog), opacity: 0 }],
      { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
    );
    animationRef.current = animation;
    animation.onfinish = () => dialog.close();
  }

  function changeImage(step: number) {
    if (closingRef.current) return;
    setDirection(step);
    setIndex(value => (value + step + images.length) % images.length);
  }

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (!dialogRef.current?.contains(document.activeElement)) {
          event.preventDefault(); first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
        return;
      }
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        if (closingRef.current) return;
        const step = event.key === 'ArrowRight' ? 1 : -1;
        setDirection(step);
        setIndex(value => (value + step + images.length) % images.length);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, images.length]);

  if (!images.length) return null;
  const coverIndex = 0;
  const highlights = ['seat-selection', 'payment-methods', 'admin-movies']
    .map(name => images.findIndex(image => image.src.includes(name)))
    .filter(value => value >= 0 && value !== coverIndex);

  function showImage(value: number, trigger: HTMLButtonElement) {
    closingRef.current = false;
    triggerRef.current = trigger;
    setIndex(value);
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function thumbnail(imageIndex: number, cover = false) {
    const image = images[imageIndex];
    return (
      <button key={image.src} type="button" onClick={event => showImage(imageIndex, event.currentTarget)}
        aria-label={`Enlarge ${image.caption ?? projectName}`}
        className="motion-card group block w-full min-w-0 overflow-hidden rounded-xl border border-border bg-surface text-left hover:border-accent">
        <span className="relative block aspect-video overflow-hidden bg-background">
          <ScreenshotImage src={cover ? image.src : image.thumbnail ?? image.src} alt={image.alt}
            sizes={variant === 'compact' ? (cover ? '(min-width: 1200px) 470px, (min-width: 1024px) 42vw, 90vw' : '(min-width: 1200px) 150px, 28vw') : '(min-width: 1200px) 540px, (min-width: 640px) 46vw, 92vw'}
            className="object-contain" />
          {cover && <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-lg border border-border bg-surface/95 p-2 text-text"><ArrowsOutIcon size={18} /></span>}
        </span>
        <span className={`block px-3 py-3 leading-5 text-text ${variant === 'compact' && !cover ? 'text-xs' : 'text-sm font-medium'}`}>
          {image.caption ?? `Screenshot ${imageIndex + 1}`}
        </span>
      </button>
    );
  }

  return (
    <>
      {variant === 'compact' ? (
        <div className="space-y-3">
          {thumbnail(coverIndex, true)}
          <div className="grid grid-cols-3 gap-2">{highlights.map(value => thumbnail(value))}</div>
          <p className="text-xs text-muted">Select a preview to explore all {images.length} screenshots.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">{images.map((_, value) => thumbnail(value))}</div>
      )}
      <dialog ref={dialogRef} aria-labelledby={titleId}
        onCancel={event => { event.preventDefault(); closeViewer(); }}
        onClose={() => { closingRef.current = false; setOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeViewer();
        }}
        className="gallery-dialog fixed inset-0 m-auto max-h-[94svh] w-[calc(100%_-_1.5rem)] max-w-6xl overflow-auto rounded-2xl border border-border bg-surface p-0 text-text shadow-2xl">
        {open && current && (
          <>
            <div className="flex min-h-16 items-center justify-between gap-3 border-b border-border px-4">
              <h2 id={titleId} className="text-sm font-semibold sm:text-base">{current.caption ?? projectName}</h2>
              <button type="button" autoFocus onClick={closeViewer} aria-label="Close screenshot viewer"
                className="motion-button flex size-11 shrink-0 items-center justify-center rounded-lg border border-border hover:border-accent"><XIcon size={19} /></button>
            </div>
            <div className="relative h-[min(65svh,680px)] overflow-hidden bg-background">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div key={current.src} custom={direction} className="absolute inset-0"
                  variants={{ enter: (step: number) => ({ opacity: 0, x: reduceMotion ? 0 : step * 18 }), visible: { opacity: 1, x: 0 }, exit: (step: number) => ({ opacity: 0, x: reduceMotion ? 0 : -step * 18 }) }}
                  initial="enter" animate="visible" exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}>
                  <ScreenshotImage src={current.src} alt={current.alt} sizes="(min-width: 1200px) 1152px, 96vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3 sm:px-5">
              <button type="button" disabled={images.length < 2} aria-label="Previous screenshot" onClick={() => changeImage(-1)}
                className="motion-button flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 hover:border-accent disabled:opacity-40"><CaretLeftIcon size={18} /><span className="hidden sm:inline">Previous</span></button>
              <span aria-live="polite" aria-atomic="true" className="text-sm text-muted">{index + 1} / {images.length}</span>
              <a href={current.src} target="_blank" rel="noopener noreferrer" className="rounded px-2 py-3 text-sm text-accent underline underline-offset-4">Open full image</a>
              <button type="button" disabled={images.length < 2} aria-label="Next screenshot" onClick={() => changeImage(1)}
                className="motion-button flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 hover:border-accent disabled:opacity-40"><span className="hidden sm:inline">Next</span><CaretRightIcon size={18} /></button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
