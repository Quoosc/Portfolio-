'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, EyeIcon, XIcon } from '@phosphor-icons/react';

type GalleryImage = { src: string; alt: string };

export function ProjectScreenshot({
  images,
  urlLabel,
}: {
  images: GalleryImage[];
  urlLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = images[index];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        aria-label={`View screenshots of ${current.alt}`}
        className="group max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-surface/60 text-left shadow-[0_0_30px_-14px_var(--color-accent)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_36px_-10px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <span className="size-2 rounded-full bg-accent" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="ml-2 font-display text-[11px] text-muted">{urlLabel}</span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="24rem"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-200 group-hover:bg-background/50 group-hover:opacity-100">
            <span className="flex size-11 items-center justify-center rounded-full border border-accent bg-surface/80 text-accent">
              <EyeIcon size={20} weight="bold" />
            </span>
          </div>
        </div>
        {images.length > 1 && (
          <div className="border-t border-border/60 px-4 py-2 text-center text-[11px] text-muted">
            +{images.length - 1} more screenshots
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-border/60 py-3 pr-14 pl-4">
                <span className="size-2 rounded-full bg-accent" />
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
                <span className="ml-2 font-display text-[11px] text-muted">{current.alt}</span>
                {images.length > 1 && (
                  <span className="ml-auto font-display text-[11px] text-muted">
                    {index + 1} / {images.length}
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/9] w-full bg-background">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="80rem"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface/90 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <XIcon size={18} weight="bold" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous screenshot"
                    className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface/90 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <CaretLeftIcon size={18} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface/90 text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <CaretRightIcon size={18} weight="bold" />
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
