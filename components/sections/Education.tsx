import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto flex max-w-6xl scroll-mt-16 items-center border-t border-border/60 px-4 py-20 sm:px-6 md:py-24"
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
          <article className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
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
