'use client';

import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ListIcon, X } from '@phosphor-icons/react';
import { useActiveSection } from '@/hooks/use-active-section';
import { siteConfig } from '@/lib/site-config';
import { scrollToSection } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = siteConfig.navLinks.map((link) => link.href.replace('#', ''));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setMenuOpen(false);
    // Let the mobile menu's close re-render settle before starting the
    // scroll animation — starting both at once can cancel the scroll on
    // some Android Chrome versions.
    requestAnimationFrame(() => scrollToSection(id));
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-surface/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-text"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <span
            className="text-2xl font-bold"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {siteConfig.shortName}
          </span>
          <span>{siteConfig.name}</span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href.replace('#', ''))}
                    aria-current={isActive ? 'true' : undefined}
                    style={
                      isActive
                        ? {
                            background: 'var(--nav-pill-bg)',
                            borderColor: 'var(--nav-pill-border-color)',
                          }
                        : undefined
                    }
                    className={`relative block rounded-full border px-3.5 py-1.5 font-display text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'text-accent backdrop-blur-sm'
                        : 'border-transparent text-muted hover:text-accent'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        style={{ boxShadow: 'var(--nav-pill-underline-shadow)' }}
                        className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          >
            {menuOpen ? (
              <X size={16} weight="bold" />
            ) : (
              <ListIcon size={16} weight="bold" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-b border-border/60 bg-surface/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {siteConfig.navLinks.map((link) => {
                const isActive = activeId === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href.replace('#', ''))}
                      aria-current={isActive ? 'true' : undefined}
                      style={
                        isActive
                          ? {
                              background: 'var(--nav-pill-bg)',
                              borderColor: 'var(--nav-pill-border-color)',
                            }
                          : undefined
                      }
                      className={`block rounded-lg border px-3 py-2.5 font-display text-xs uppercase tracking-wider transition-all ${
                        isActive
                          ? 'text-accent backdrop-blur-sm'
                          : 'border-transparent text-muted hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
