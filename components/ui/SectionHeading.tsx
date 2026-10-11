import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
