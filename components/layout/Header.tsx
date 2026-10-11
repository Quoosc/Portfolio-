'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ListIcon, X } from '@phosphor-icons/react';
import { useActiveSection } from '@/hooks/use-active-section';
import { siteConfig } from '@/lib/site-config';
import { scrollToSection } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = siteConfig.navLinks.map((link) => link.href.replace('#', ''));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(sectionIds);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

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
    if (pathname !== '/') {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);
    requestAnimationFrame(() => {
      scrollToSection(id);
      if (wasMenuOpen) menuButtonRef.current?.focus({ preventScroll: true });
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
                    style={isActive ? { borderColor: 'var(--nav-active-border)' } : undefined}
                    className={`relative rounded-lg border border-transparent px-3.5 py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'bg-[var(--nav-active-bg)] text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 h-px bg-accent"
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
            {menuOpen ? <X size={19} weight="bold" /> : <ListIcon size={19} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border/80 bg-background/95 backdrop-blur-xl lg:hidden"
          >
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
