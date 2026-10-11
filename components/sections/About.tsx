import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function About() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-6xl scroll-mt-16 items-center border-t border-border/60 px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="w-full max-w-3xl">
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
          <p className="mt-5 max-w-prose text-base leading-7 text-muted">
            I&apos;m pursuing a {siteConfig.profile.major} degree at the{' '}
            {siteConfig.profile.university}, with a GPA of {siteConfig.profile.gpa}. My studies
            and project work have given me a foundation in building full-stack web applications.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p className="mt-4 max-w-prose text-base leading-7 text-muted">
            I&apos;m interested in full-stack development and Applied AI, and in building my
            knowledge of AI and data processing through practical work.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
