'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { usePathname } from 'next/navigation';
import { useActiveSection } from '@/hooks/use-active-section';
import { siteConfig } from '@/lib/site-config';
import { scrollToSection } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = siteConfig.navLinks.map((link) => link.href.replace('#', ''));

function MobileMenu({ children }: { children: ReactNode }) {
  const present = useIsPresent();
  const reduceMotion = useReducedMotion();
  return <motion.nav id="mobile-navigation" aria-label="Mobile navigation" inert={!present}
    initial={reduceMotion ? false : { opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
    transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
    className="overflow-hidden border-t border-border/80 bg-background/95 backdrop-blur-xl lg:hidden">
    {children}
  </motion.nav>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(sectionIds);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname !== '/') {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    const keyboard = event.detail === 0;
    setMenuOpen(false);
    requestAnimationFrame(() => {
      scrollToSection(id, { focus: keyboard });
    });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={pathname === '/' ? '#home' : '/#home'}
          aria-label="Pham Tran Quoc — Home"
          onClick={(event) => handleNavClick(event, 'home')}
          className="whitespace-nowrap rounded-sm font-display text-base font-semibold tracking-[-0.03em] text-text sm:text-lg"
        >
          Pham Tran Quoc
        </a>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = pathname === '/' && activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={pathname === '/' ? link.href : `/${link.href}`}
                    onClick={(event) => handleNavClick(event, id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative isolate inline-flex rounded-lg border border-transparent px-3.5 py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        layoutId="desktop-active-navigation-indicator"
                        className="pointer-events-none absolute -inset-px -z-10 rounded-lg border border-[var(--nav-active-border)] bg-[var(--nav-active-bg)]"
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? 'mobile-navigation' : undefined}
            className="flex size-11 items-center justify-center rounded-xl border border-border text-text transition-colors hover:border-accent/70 hover:text-accent lg:hidden"
          >
            <span aria-hidden="true" className="menu-glyph" data-open={menuOpen}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <MobileMenu>
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {siteConfig.navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = pathname === '/' && activeId === id;
                return (
                  <li key={link.href}>
                    <a
                      href={pathname === '/' ? link.href : `/${link.href}`}
                      onClick={(event) => handleNavClick(event, id)}
                      aria-current={isActive ? 'location' : undefined}
                      style={isActive ? { borderColor: 'var(--nav-active-border)' } : undefined}
                      className={`block rounded-lg border border-transparent px-4 py-3 text-sm transition-colors ${
                        isActive ? 'bg-[var(--nav-active-bg)] text-text' : 'text-muted hover:text-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </MobileMenu>
        )}
      </AnimatePresence>
    </header>
  );
}
