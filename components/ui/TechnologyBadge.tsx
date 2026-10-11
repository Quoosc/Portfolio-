import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';

type TechnologyBadgeProps = {
  name: string;
  icon?: IconType;
  color?: string;
};

export function TechnologyBadge({ name, icon: Icon, color }: TechnologyBadgeProps) {
  const style = {
    '--technology-color': color ?? 'var(--color-accent)',
  } as CSSProperties;

  return (
    <li
      className="technology-badge inline-flex min-h-11 items-center gap-2.5 rounded-xl px-3.5 py-2 text-base font-semibold transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px sm:px-4"
      style={style}
    >
      {Icon ? (
        <Icon size={19} aria-hidden="true" className="technology-badge__icon" />
      ) : (
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[var(--technology-color)]" />
      )}
      <span>{name}</span>
    </li>
  );
}
