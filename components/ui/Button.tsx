'use client';

import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { scrollToSection } from '@/lib/utils';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-display text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_0_20px_-6px_var(--color-accent)] hover:shadow-[0_0_28px_-4px_var(--color-accent)] hover:brightness-110',
  secondary: 'border border-border text-text hover:border-accent hover:text-accent',
};

type ButtonAsLink = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant;
  href: string;
};

type ButtonAsButton = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  href?: undefined;
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonAsLink | ButtonAsButton) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ('href' in props && props.href) {
    const { href, onClick, ...rest } = props;
    const isSectionLink = href.startsWith('#');

    return (
      <a
        href={href}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (isSectionLink) {
            e.preventDefault();
            scrollToSection(href.slice(1));
          }
          onClick?.(e);
        }}
        {...rest}
        className={classes}
      />
    );
  }

  return <button type="button" {...(props as ComponentPropsWithoutRef<'button'>)} className={`${classes} cursor-pointer`} />;
}
