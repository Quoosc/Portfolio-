import Link from 'next/link';
import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnologyBadge } from '@/components/ui/TechnologyBadge';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { projects } from '@/data/projects';

export function Projects() {
  const project = projects[0];

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border/80 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Selected work"
            title="Building the product behind Cineon."
            description="A full-stack movie booking application, from seat selection to backend workflows."
          />
        </FadeIn>

        <article className="mt-10 overflow-hidden rounded-[1.5rem] border border-border bg-surface sm:mt-12">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <FadeIn className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                <span className="font-mono uppercase tracking-[0.16em] text-accent">
                  {project.category}
                </span>
                <span aria-hidden="true" className="size-1 rounded-full bg-border" />
                <span>{project.period}</span>
              </div>

              <h3 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-text sm:text-4xl">
                {project.name}
                <span className="mt-1 block text-lg font-normal tracking-normal text-muted sm:text-xl">
                  {project.product}
                </span>
              </h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Live Demo <ArrowUpRightIcon size={16} weight="bold" />
                </a>
                <Link
                  href="/projects/cineon"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-elevated px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/70 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Case Study <ArrowUpRightIcon size={16} weight="bold" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-5">
                {project.githubLinks.map((repository) => (
                  <a
                    key={repository.url}
                    href={repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-2 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <GithubLogoIcon size={17} weight="bold" aria-hidden="true" />
                    {repository.label}
                    <ArrowUpRightIcon size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.06} className="border-t border-border bg-background p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <ProjectPreview images={project.images} name={project.name} />
              <p className="mt-4 text-xs text-muted">Role: {project.role}</p>
            </FadeIn>
          </div>

          <div className="grid gap-8 border-t border-border p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
            <div>
              <h4 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Selected contributions
              </h4>
              <ul className="mt-5 space-y-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight.title} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <p className="text-sm leading-6 text-muted sm:text-base sm:leading-7">
                      <span className="font-medium text-text">{highlight.title}.</span>{' '}
                      {highlight.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Technology
              </h4>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((technology) => (
                  <TechnologyBadge key={technology.name} {...technology} />
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
