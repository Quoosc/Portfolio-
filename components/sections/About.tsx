import { CalendarDotsIcon, GraduationCapIcon } from '@phosphor-icons/react/dist/ssr';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/site-config';

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border/80 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-center lg:gap-16">
        <div>
          <FadeIn>
            <SectionHeading
              eyebrow="About"
              title="A software engineering student who enjoys making useful things."
            />
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              <p>
                I&apos;m studying {siteConfig.profile.major} at {siteConfig.profile.university}.
                Building full-stack applications has helped me connect software fundamentals with
                practical product work.
              </p>
              <p>
                I&apos;m interested in full-stack development and practical applications of AI, and
                continue to build my technical foundation through project work and study.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-elevated text-accent">
                <GraduationCapIcon size={22} weight="regular" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  Education
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-text">
                  {siteConfig.profile.university}
                </h3>
                <p className="mt-1 text-sm text-muted">{siteConfig.profile.major}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <p className="text-xs text-muted">GPA</p>
                <p className="mt-1 text-base font-semibold text-text">{siteConfig.profile.gpa}</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <CalendarDotsIcon size={14} aria-hidden="true" /> Study period
                </p>
                <p className="mt-1 text-sm font-medium text-text">{siteConfig.profile.educationPeriod}</p>
              </div>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
