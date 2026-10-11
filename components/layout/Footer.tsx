'use client';

import type { MouseEvent } from 'react';
import { ArrowUpIcon } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';
import { scrollToSection } from '@/lib/utils';

const year = new Date().getFullYear();

export function Footer() {
  const pathname = usePathname();

  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return;
    event.preventDefault();
    scrollToSection('home');
  }

  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href={pathname === '/' ? '#home' : '/#home'}
            onClick={goHome}
            className="whitespace-nowrap rounded-sm font-display text-base font-semibold tracking-[-0.03em] text-text sm:text-lg"
          >
            Pham Tran Quoc
          </a>
          <p className="mt-1 text-xs text-muted">
            © {year} {siteConfig.profile.fullName}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={pathname === '/' ? link.href : `/${link.href}`}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={pathname === '/' ? '#home' : '/#home'}
          onClick={goHome}
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg px-2 text-sm text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to top <ArrowUpIcon size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
