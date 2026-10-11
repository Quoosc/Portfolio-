'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme !== 'light';

	return (
		<button
			type="button"
			onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
			aria-label={
				isDark ? 'Switch to light theme' : 'Switch to dark theme'
			}
			className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		>
			{isDark ? (
				<SunIcon size={16} weight="bold" />
			) : (
				<MoonIcon size={16} weight="bold" />
			)}
		</button>
	);
}
