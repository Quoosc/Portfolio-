import { ArrowSquareOutIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { projects } from '@/data/projects';
import { ProjectScreenshot } from './ProjectScreenshot';

export function Projects() {
  const project = projects[0];

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-16 border-t border-border/60 px-4 py-20 sm:px-6 md:py-24"
    >
      <FadeIn delay={0}>
        <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
          Featured Project
        </span>
      </FadeIn>

      <FadeIn delay={0.08}>
        <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
          A closer look at my project work.
        </h2>
      </FadeIn>

      <article className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
      <div
        className={`grid gap-8 ${project.images.length > 0 ? 'md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start md:gap-12' : ''}`}
      >
        <div>
          <FadeIn delay={0.16}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-text">{project.name}</h3>
              <span className="text-xs text-muted">{project.period}</span>
            </div>
            <p className="mt-1 text-sm text-accent">{project.role}</p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.28}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowSquareOutIcon size={14} weight="bold" />
                  View Live Demo
                </Button>
              )}
              {project.githubLinks.map((link) => (
                <Button
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <GithubLogoIcon size={14} weight="bold" />
                  {link.label}
                </Button>
              ))}
            </div>
          </FadeIn>
        </div>

        {project.images.length > 0 && (
          <FadeIn delay={0.24} className="flex md:justify-end">
            <ProjectScreenshot images={project.images} urlLabel={project.name} />
          </FadeIn>
        )}
      </div>

      <div className="mt-10 grid gap-10 border-t border-border pt-8 md:grid-cols-2 md:gap-16">
        <FadeIn delay={0.16}>
          <h4 className="font-display text-xs uppercase tracking-wider text-muted">Tech Stack</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <li
                  key={tech.name}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 text-xs text-text backdrop-blur-md"
                >
                  {Icon && <Icon size={14} color="var(--color-accent)" aria-hidden="true" />}
                  {tech.name}
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <FadeIn delay={0.24}>
          <h4 className="font-display text-xs uppercase tracking-wider text-muted">Key Contributions</h4>
          <ul className="mt-3 space-y-3">
            {project.features.map((feature) => (
              <li key={feature.title} className="flex gap-2.5">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-muted">
                  <span className="font-medium text-text">{feature.title}.</span>{' '}
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
      </article>
    </section>
  );
}
