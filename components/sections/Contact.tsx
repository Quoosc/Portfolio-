import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { siteConfig } from '@/lib/site-config';

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-16 border-t border-border/60 px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="max-w-2xl">
        <FadeIn delay={0}>
          <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
            Contact
          </span>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
            Let&apos;s connect.
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
            For project inquiries and professional opportunities, feel free to reach out by email.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="mt-7">
            <Button href={`mailto:${siteConfig.socialLinks.email}`}>
              <EnvelopeSimpleIcon size={16} weight="bold" />
              Email me
            </Button>
          </div>

          <ul className="mt-7 space-y-3">
            <li>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="inline-flex items-center gap-3 text-sm text-text transition-colors hover:text-accent"
              >
                <EnvelopeSimpleIcon size={18} weight="bold" className="text-accent" />
                {siteConfig.socialLinks.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.socialLinks.phone}`}
                className="inline-flex items-center gap-3 text-sm text-text transition-colors hover:text-accent"
              >
                <PhoneIcon size={18} weight="bold" className="text-accent" />
                {siteConfig.socialLinks.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-text transition-colors hover:text-accent"
              >
                <GithubLogoIcon size={18} weight="bold" className="text-accent" />
                github.com/Quoosc
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted">
              <MapPinIcon size={18} weight="bold" className="text-accent" />
              {siteConfig.profile.location}
            </li>
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
