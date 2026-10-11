import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function About() {
  return (
    <section
      id="about"
      className="mx-auto flex border-t border-border/60 max-w-6xl scroll-mt-16 items-center px-4 py-16 sm:px-6 md:min-h-[calc(100vh-4rem)] md:py-10"
    >
      <div className="grid w-full items-center gap-10 md:grid-cols-2 md:gap-10">
        <FadeIn delay={0} className="order-2 md:order-none">
          <div className="group relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 shadow-[0_0_40px_-12px_var(--color-accent)] transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_50px_-8px_var(--color-accent)]">
            <Image
              src="/pham-tran-quoc.jpg"
              alt="Pham Tran Quoc"
              fill
              sizes="(min-width: 768px) 24rem, 90vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        </FadeIn>

        <div className="order-1 md:order-none">
          <FadeIn delay={0}>
            <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
              About Me
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
              A software engineering student with a full-stack focus.
            </h2>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
              I&apos;m pursuing a {siteConfig.profile.major} degree at the{' '}
              {siteConfig.profile.university}, with a GPA of {siteConfig.profile.gpa}. My studies
              and project work have given me a foundation in building full-stack web applications.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
              I&apos;m interested in full-stack development and Applied AI, and in building my
              knowledge of AI and data processing through practical work.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
