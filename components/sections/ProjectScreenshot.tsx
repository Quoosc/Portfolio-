'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import type { ProjectImage } from '@/data/projects';

export function ProjectScreenshot({
  images,
  projectName,
}: {
  images: ProjectImage[];
  projectName: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const current = images[index] ?? images[0];

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key === 'ArrowRight' && images.length > 1) {
        setIndex((value) => (value + 1) % images.length);
        return;
      }
      if (event.key === 'ArrowLeft' && images.length > 1) {
        setIndex((value) => (value - 1 + images.length) % images.length);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [images.length, open]);

  if (images.length === 0 || !current) return null;

  const next = () => setIndex((value) => (value + 1) % images.length);
  const previous = () => setIndex((value) => (value - 1 + images.length) % images.length);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        aria-label={`Open ${projectName} project screenshots`}
        className="group block w-full overflow-hidden rounded-xl border border-border bg-elevated text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <span className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-muted">
          <span>{images[0].caption ?? `View ${projectName} screenshots`}</span>
          {images.length > 1 && (
            <span className="shrink-0 font-mono text-xs text-accent">
              {images.length} images
            </span>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-gallery-title"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            >
              <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-4 pr-16 sm:px-6">
                <h2 id="project-gallery-title" className="truncate text-sm font-medium text-text">
                  {current.caption ?? `${projectName} screenshots`}
                </h2>
                {images.length > 1 && (
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {index + 1} / {images.length}
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/10] max-h-[calc(100svh-8rem)] w-full bg-background">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close screenshot viewer"
                className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-lg border border-border bg-elevated text-text transition-colors hover:border-accent hover:text-accent"
              >
                <XIcon size={18} weight="bold" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-surface/95 text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    <CaretLeftIcon size={19} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-surface/95 text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    <CaretRightIcon size={19} weight="bold" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
