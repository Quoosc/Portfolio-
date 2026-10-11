import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto flex border-t border-border/60 max-w-6xl scroll-mt-16 items-center px-4 py-16 sm:px-6 md:min-h-[calc(100vh-4rem)] md:py-10"
    >
      <div className="w-full">
        <FadeIn delay={0}>
          <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
            Education
          </span>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
            Building a strong foundation.
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <article className="mt-8 rounded-2xl border border-border/60 bg-surface/60 p-6 shadow-[0_0_30px_-14px_var(--color-accent)] backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-text">
                  {siteConfig.profile.university}
                </h3>
                <p className="mt-2 text-sm text-muted">{siteConfig.profile.major}</p>
              </div>
              <span className="shrink-0 text-sm text-accent">{siteConfig.profile.educationPeriod}</span>
            </div>
            <p className="mt-5 border-t border-border/60 pt-4 text-sm text-muted">
              GPA: <span className="font-medium text-text">{siteConfig.profile.gpa}</span>
            </p>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
