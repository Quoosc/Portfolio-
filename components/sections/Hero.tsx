import {
  EnvelopeSimpleIcon,
  FilePdfIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex max-w-6xl scroll-mt-16 items-center px-4 py-14 sm:px-6 md:min-h-[calc(100vh-4rem)] md:py-16"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-8">
        <div className="relative z-10">
          <FadeIn delay={0}>
            <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
              {siteConfig.profile.role}
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl">
              Building practical software. Exploring{' '}
              {' '}<span
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Applied AI
              </span>
              .
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              I&apos;m {siteConfig.profile.fullName}, a Software Engineering student at{' '}
              <span className="font-medium text-text">{siteConfig.profile.university}</span>. I
              focus on full-stack development and am building my knowledge of Applied AI through
              practical work.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects">Explore my work</Button>
              <Button href="#contact" variant="secondary">Get in touch</Button>
              <Button
                href="/pham-tran-quoc-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <FilePdfIcon size={14} weight="bold" />
                Resume
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <GithubLogoIcon size={20} weight="bold" />
              </a>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                aria-label="Email"
                className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <EnvelopeSimpleIcon size={20} weight="bold" />
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="relative mx-auto w-full max-w-md md:ml-auto">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/5" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-xl shadow-black/10">
              <Image src="/pham-tran-quoc.jpg" alt="Pham Tran Quoc" fill priority sizes="(min-width: 768px) 28rem, 90vw" className="object-cover object-[center_30%]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-6 pb-6 pt-24 text-white">
                <p className="text-lg font-semibold">{siteConfig.profile.fullName}</p>
                <p className="mt-1 text-sm text-white/80">{siteConfig.profile.role} · {siteConfig.profile.location}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
