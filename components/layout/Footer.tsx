'use client';

import type { MouseEvent } from 'react';
import { EnvelopeSimpleIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { siteConfig } from '@/lib/site-config';
import { scrollToSection } from '@/lib/utils';

const year = new Date().getFullYear();

function handleNavClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  scrollToSection(id);
}

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="inline-block font-display text-4xl font-bold sm:text-5xl"
          style={{
            backgroundImage:
              'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {siteConfig.profile.fullName}
        </a>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {siteConfig.profile.motto}
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {siteConfig.profile.fullName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <nav>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href.replace('#', ''))}
                      className="text-xs text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <GithubLogoIcon size={18} weight="bold" />
              </a>
              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                aria-label="Email"
                className="rounded-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <EnvelopeSimpleIcon size={18} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
