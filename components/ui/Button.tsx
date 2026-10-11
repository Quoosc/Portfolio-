'use client';

import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { scrollToSection } from '@/lib/utils';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90',
  secondary: 'border border-border bg-surface text-text hover:border-accent/70 hover:text-accent',
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
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (isSectionLink) {
            event.preventDefault();
            scrollToSection(href.slice(1));
          }
          onClick?.(event);
        }}
        {...rest}
        className={classes}
      />
    );
  }

  return (
    <button
      type="button"
      {...(props as ComponentPropsWithoutRef<'button'>)}
      className={`${classes} cursor-pointer`}
    />
  );
}
