import {
  EnvelopeSimpleIcon,
  FilePdfIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

const codeLines = [
  { key: 'name', value: siteConfig.profile.fullName },
  { key: 'role', value: siteConfig.profile.role },
  { key: 'focus', value: siteConfig.profile.careerInterests },
  { key: 'university', value: siteConfig.profile.university },
  { key: 'gpa', value: siteConfig.profile.gpa },
  { key: 'location', value: siteConfig.profile.location },
];

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex max-w-6xl scroll-mt-16 items-center px-4 py-16 sm:px-6 md:min-h-[calc(100vh-4rem)] md:py-10"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-8">
        <div>
          <FadeIn delay={0}>
            <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
              {siteConfig.profile.role}
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight text-text sm:text-5xl">
              Building full-stack software and exploring{' '}
              <span
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
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
              Hi, I&apos;m {siteConfig.profile.fullName}, a Software Engineering student at the{' '}
              <span className="font-medium text-accent">{siteConfig.profile.university}</span>.
              I build full-stack web applications and am interested in applying AI to real-world
              challenges.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects">View Project</Button>
              <Button href="#contact" variant="secondary">Contact</Button>
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
          <div className="rounded-2xl border border-border/60 bg-surface/60 shadow-[0_0_40px_-12px_var(--color-accent)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_50px_-8px_var(--color-accent)]">
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <span className="size-2 rounded-full bg-accent" />
              <span className="font-display text-[11px] uppercase tracking-wider text-muted">
                student.js
              </span>
            </div>
            <code className="block px-4 py-4 font-body text-[13px] leading-relaxed sm:text-sm">
              <div>
                <span className="text-accent-2">const</span>{' '}
                <span className="text-text">student</span>{' '}
                <span className="text-muted">= {'{'}</span>
              </div>
              {codeLines.map((line) => (
                <div key={line.key} className="flex">
                  <span className="w-4 shrink-0" aria-hidden="true" />
                  <span className="wrap-break-word">
                    <span className="text-muted">{line.key}</span>
                    <span className="text-muted">: </span>
                    <span className="text-accent">&quot;{line.value}&quot;</span>
                    <span className="text-muted">,</span>
                  </span>
                </div>
              ))}
              <div className="text-muted">{'}'};</div>
            </code>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
