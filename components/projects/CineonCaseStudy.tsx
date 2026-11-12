import Link from 'next/link';
import { ArrowLeftIcon, ArrowUpRightIcon, GithubLogoIcon, ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { ProjectScreenshot } from '@/components/sections/ProjectScreenshot';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnologyBadge } from '@/components/ui/TechnologyBadge';
import { projects } from '@/data/projects';

const journey = [
  ['Discover', 'Browse movies and choose a film.'],
  ['Choose a showtime', 'Review movie details and available screenings.'],
  ['Select seats', 'Choose seats and review the booking summary.'],
  ['Checkout', 'Choose a payment method and complete the booking flow.'],
  ['View the ticket', 'See the confirmed booking and e-ticket.'],
];

const backendSource = 'https://github.com/Quoosc/movie-booking-backend/blob/1162bb255b5fb6c78b9b956694271d50a0e32fbc';
const reservationFlow = [
  ['Validate the selection', 'The booking service checks the showtime, requested seats, ticket types, and seat availability.'],
  ['Acquire temporary holds', 'Redis SET with NX and EX attempts an expiring lock for each seat, identified by its showtime and seat ID.'],
  ['Record the reservation', 'Within a database transaction, the service saves the lock owner and expiry, records the selected seats, and updates their status.'],
  ['Return the booking context', 'The API returns the lock ID, selected seats, price, and expiry information for the next step.'],
];

export function CineonCaseStudy() {
  const project = projects.find(item => item.slug === 'cineon');
  if (!project) return null;
  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24">
      <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted hover:text-text"><ArrowLeftIcon size={16} /> Back to Portfolio</Link>
      <header className="mt-10 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Case study / Full-stack web application</p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-text sm:text-6xl">Cineon<span className="mt-3 block text-2xl font-normal tracking-normal text-muted">Movie Booking Web</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">From movie discovery to an e-ticket: connecting a React interface with Laravel APIs and MySQL.</p>
        </div>
        <dl className="grid grid-cols-2 gap-5 border-t border-border pt-4 text-sm lg:border-l lg:border-t-0 lg:pl-6">
          <div><dt className="text-muted">My role</dt><dd className="mt-2 font-medium text-text">{project.role}</dd></div>
          <div><dt className="text-muted">Period</dt><dd className="mt-2 font-medium text-text">{project.period}</dd></div>
        </dl>
      </header>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent">Explore Live Demo <ArrowUpRightIcon size={16} /></a>
        {project.githubLinks.map(repository => <a key={repository.url} href={repository.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text hover:border-accent"><GithubLogoIcon size={17} />{repository.label}<ArrowUpRightIcon size={13} /></a>)}
      </div>
      <nav aria-label="Case study contents" className="mt-10 flex flex-wrap gap-x-5 gap-y-1 border-y border-border py-3 text-sm">
        {['Overview', 'Product tour', 'Contributions', 'Engineering', 'Technology'].map(label => <a key={label} href={`#${label.toLowerCase().replaceAll(' ', '-')}`} className="inline-flex min-h-11 items-center rounded text-muted hover:text-accent">{label}</a>)}
      </nav>

      <section id="overview" className="scroll-mt-24 py-12 sm:py-16">
        <SectionHeading eyebrow="The problem" title="A booking flow with connected parts." description="A movie booking application needs to connect screenings, seat availability, payments, and user access. Customers need a clear path to a ticket; administrators need tools to manage the content behind it." />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map(([title, description], index) => <li key={title} className="rounded-xl border border-border bg-surface p-4">
            <span className="font-mono text-xs text-accent">0{index + 1}</span><h3 className="mt-3 font-semibold text-text">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </li>)}
        </ol>
      </section>

      <section id="product-tour" className="scroll-mt-24 border-t border-border py-12 sm:py-16">
        <SectionHeading eyebrow="Product tour" title="Explore the booking experience." description="Follow the customer journey, then take a look at the administration screens. Select any image to enlarge it." />
        <div className="mt-8"><ProjectScreenshot images={project.images} projectName={project.name} /></div>
      </section>

      <section id="contributions" className="scroll-mt-24 grid gap-8 border-t border-border py-12 sm:py-16 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="My contribution" title="Connecting the interface and backend." />
        <ul className="space-y-6">{project.highlights.map(highlight => <li key={highlight.title} className="border-l-2 border-accent/60 pl-5"><h3 className="text-lg font-semibold text-text">{highlight.title}</h3><p className="mt-2 leading-7 text-muted">{highlight.description}</p></li>)}</ul>
      </section>

      <section id="engineering" className="scroll-mt-24 border-t border-border py-12 sm:py-16">
        <SectionHeading eyebrow="Engineering" title="Managing the path from seat selection to booking." />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6"><h3 className="text-lg font-semibold text-text">The seat-selection challenge</h3><p className="mt-3 leading-7 text-muted">{project.challenge.description}</p><p className="mt-3 leading-7 text-muted">The backend attempts an expiring Redis lock for each selected seat. If one cannot be acquired, it releases the locks acquired during that attempt. The configured default reservation window is 10 minutes and can be overridden by the deployment environment.</p></div>
          <div className="rounded-2xl border border-border bg-surface p-6"><h3 className="text-lg font-semibold text-text">Integration across the stack</h3><p className="mt-3 leading-7 text-muted">ReactJS provides the customer-facing and admin interfaces. RESTful APIs connect them to Laravel business logic and MySQL database operations.</p><p className="mt-3 leading-7 text-muted">This project brought together interface development, API integration, and the details of booking and payment workflows.</p></div>
        </div>
        <div className="mt-8"><ArchitectureDiagram layers={project.architecture} /></div>
        <h3 className="mt-10 text-xl font-semibold text-text">How a seat reservation is created</h3>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {reservationFlow.map(([title, description], index) => <li key={title} className="rounded-xl border border-border bg-surface p-5"><span className="font-mono text-xs text-accent">0{index + 1}</span><h4 className="mt-2 font-semibold text-text">{title}</h4><p className="mt-2 text-sm leading-6 text-muted">{description}</p></li>)}
        </ol>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
            ['Booking service', 'app/Modules/Booking/Services/BookingService.php'],
            ['Lock implementation', 'app/Shared/Services/RedisLockService.php'],
            ['Reservation configuration', 'config/booking.php'],
          ].map(([label, path]) => <a key={path} href={`${backendSource}/${path}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded text-accent underline underline-offset-4">{label} ↗</a>)}
        </div>
        <h3 className="mt-10 text-xl font-semibold text-text">Access and payment safeguards</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">{project.security.map(item => <li key={item} className="flex gap-3 rounded-xl border border-border bg-surface p-4"><ShieldCheckIcon size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" /><span className="text-sm leading-6 text-muted">{item}</span></li>)}</ul>
        <div className="mt-8 border-l-2 border-border pl-5"><h3 className="font-semibold text-text">Where I would take it next</h3><p className="mt-2 max-w-3xl leading-7 text-muted">Future improvements I would prioritize include documenting reservation edge cases, testing interrupted payment flows, and reviewing the mobile booking experience.</p></div>
      </section>

      <section id="technology" className="scroll-mt-24 grid gap-8 border-t border-border py-12 sm:py-16 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="Technology" title="Tools behind the product." />
        <ul className="flex flex-wrap content-start gap-2">{project.techStack.map(technology => <TechnologyBadge key={technology.name} {...technology} />)}</ul>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted hover:text-text"><ArrowLeftIcon size={16} /> Back to Portfolio</Link>
        <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent">Get in Touch <ArrowUpRightIcon size={16} /></Link>
      </div>
    </article>
  );
}
