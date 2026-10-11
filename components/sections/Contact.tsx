import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/80 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="grid gap-10 rounded-[1.5rem] border border-border bg-surface p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Contact
              </p>
              <h2 className="mt-4 text-balance font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-text">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                Have a project or opportunity in mind? I&apos;d be glad to hear from you.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.socialLinks.email}`}
              className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <EnvelopeSimpleIcon size={17} weight="bold" aria-hidden="true" />
              Get in Touch
              <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap gap-x-6 gap-y-4 border-t border-border pt-5 text-sm lg:col-span-2">
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="inline-flex min-h-8 items-center gap-2 text-muted transition-colors hover:text-text"
              >
                <EnvelopeSimpleIcon size={17} className="text-accent" aria-hidden="true" />
                {siteConfig.socialLinks.email}
              </a>
              <a
                href={`tel:${siteConfig.socialLinks.phone}`}
                className="inline-flex min-h-8 items-center gap-2 text-muted transition-colors hover:text-text"
              >
                <PhoneIcon size={17} className="text-accent" aria-hidden="true" />
                {siteConfig.socialLinks.phone}
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-8 items-center gap-2 text-muted transition-colors hover:text-text"
              >
                <GithubLogoIcon size={17} weight="bold" className="text-accent" aria-hidden="true" />
                github.com/Quoosc
                <ArrowUpRightIcon size={13} aria-hidden="true" />
              </a>
              <span className="inline-flex min-h-8 items-center gap-2 text-muted">
                <MapPinIcon size={17} className="text-accent" aria-hidden="true" />
                {siteConfig.profile.location}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
