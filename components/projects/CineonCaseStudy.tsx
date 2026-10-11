import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react/dist/ssr';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { ProjectScreenshot } from '@/components/sections/ProjectScreenshot';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnologyBadge } from '@/components/ui/TechnologyBadge';
import { projects } from '@/data/projects';

export function CineonCaseStudy() {
  const project = projects.find((item) => item.slug === 'cineon');

  if (!project) return null;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 lg:pb-28">
      <Link
        href="/#projects"
        className="inline-flex min-h-10 items-center gap-2 rounded-lg pr-2 text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <ArrowLeftIcon size={16} aria-hidden="true" /> Back to Portfolio
      </Link>

      <header className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            <span className="whitespace-nowrap">Case study</span>
            <span aria-hidden="true" className="text-muted">/</span>
            <span>{project.category}</span>
          </p>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-text">
            {project.name}
            <span className="mt-2 block text-2xl font-normal tracking-[-0.02em] text-muted sm:text-3xl">
              {project.product}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {project.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div>
            <dt className="text-xs text-muted">Role</dt>
            <dd className="mt-1 font-medium text-text">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Period</dt>
            <dd className="mt-1 font-medium text-text">{project.period}</dd>
          </div>
        </dl>
      </header>

      <section aria-label="Product preview" className="mt-10 sm:mt-12">
        <ProjectPreview images={project.images} name={project.name} />
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="Overview" title="A booking experience across customer and admin workflows." />
        <div>
          <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {project.tagline} The application supports movie and showtime management, ticket
            booking, payment workflows, and user authorization.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open Live Demo <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
            </a>
            {project.githubLinks.map((repository) => (
              <a
                key={repository.url}
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text transition-colors hover:border-accent/70 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <GithubLogoIcon size={16} weight="bold" aria-hidden="true" />
                {repository.label}
                <ArrowUpRightIcon size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="My role" title="Full-stack development." />
        <div>
          <ul className="space-y-5">
            {project.highlights.map((highlight) => (
              <li key={highlight.title} className="border-l border-accent/60 pl-5">
                <h3 className="font-semibold text-text">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="Key features" title="The main product workflows." />
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {project.keyFeatures.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="Technical challenge" title={project.challenge.title} />
        <div>
          <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {project.challenge.description}
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            The available project notes do not specify reservation duration or the underlying
            concurrency strategy, so this case study does not make claims about those details.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <SectionHeading
          eyebrow="High-level architecture"
          title="A frontend connected to a Laravel API and MySQL."
          description="This overview shows only the technologies and connections confirmed for the project."
        />
        <div className="mt-8">
          <ArchitectureDiagram layers={project.architecture} />
        </div>
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="Security & backend" title="Controls used across key API flows." />
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.security.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <ShieldCheckIcon size={19} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-6 text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 border-b border-border py-14 sm:py-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <SectionHeading eyebrow="Technology" title="Tools used to build Cineon." />
        <ul className="flex flex-wrap content-start gap-2">
          {project.techStack.map((technology) => (
            <TechnologyBadge key={technology.name} {...technology} />
          ))}
        </ul>
      </section>

      {project.images.length > 0 && (
        <section className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Screenshots"
            title="A closer look at the product."
            description="Select an image to open the accessible screenshot viewer."
          />
          <div className="mt-8">
            <ProjectScreenshot images={project.images} projectName={project.name} />
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ArrowLeftIcon size={16} aria-hidden="true" /> Back to Portfolio
        </Link>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Explore Cineon <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
