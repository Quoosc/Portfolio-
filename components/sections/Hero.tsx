import Image from 'next/image';
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  GraduationCapIcon,
  MapPinIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl scroll-mt-20 items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:gap-14 lg:py-20"
    >
      <div className="relative z-10 max-w-2xl">
        <FadeIn delay={0}>
          <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-8 bg-accent" />
            {siteConfig.profile.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.04}>
          <h1 className="mt-6 text-balance font-display text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-text">
            Turning complex problems into practical software.
          </h1>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            I&apos;m {siteConfig.profile.fullName}, a Software Engineering student who enjoys
            building full-stack web applications and exploring practical applications of AI.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">
              Explore Projects
              <ArrowDownIcon size={16} weight="bold" />
            </Button>
            <Button
              href="/pham-tran-quoc-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              View Resume
              <ArrowUpRightIcon size={16} weight="bold" />
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <span className="inline-flex items-center gap-2">
              <GraduationCapIcon size={17} className="shrink-0 text-accent" aria-hidden="true" />
              <span>{siteConfig.profile.university}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPinIcon size={17} className="shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.profile.location}
            </span>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-text transition-colors hover:text-accent"
            >
              <GithubLogoIcon size={17} weight="bold" aria-hidden="true" />
              GitHub
              <ArrowUpRightIcon size={13} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} className="mx-auto w-full max-w-[25rem] lg:ml-auto">
        <figure className="relative">
          <div aria-hidden="true" className="absolute -right-3 -top-3 size-24 rounded-tr-3xl border-r border-t border-accent/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
            <Image
              src="/pham-tran-quoc.jpg"
              alt="Pham Tran Quoc"
              fill
              preload
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 70vw, 92vw"
              className="object-cover object-[center_30%]"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
            <span>Pham Tran Quoc</span>
            <span className="font-mono uppercase tracking-wider">Profile</span>
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  );
}
