import Image from 'next/image';
import { FilmStripIcon } from '@phosphor-icons/react/dist/ssr';
import type { ProjectImage } from '@/data/projects';

export function ProjectPreview({ images, name }: { images: ProjectImage[]; name: string }) {
  if (images.length > 0) {
    const image = images[0];
    return (
      <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-elevated">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover"
        />
        {image.caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 text-sm text-white">
            {image.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name} project preview. Screenshots will be added later.`}
      className="relative flex min-h-56 max-h-64 items-center justify-center overflow-hidden rounded-2xl border border-border bg-elevated px-6 py-10 text-center"
    >
      <div aria-hidden="true" className="absolute inset-4 rounded-xl border border-border/70" />
      <div className="relative max-w-xs">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-border bg-surface text-accent">
          <FilmStripIcon size={23} weight="regular" />
        </span>
        <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
          Project preview
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Screenshots coming soon. Cineon&apos;s live product is available to explore.
        </p>
      </div>
    </div>
  );
}
