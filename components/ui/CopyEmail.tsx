'use client';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return <div className="max-w-full">
    <button type="button" className="motion-button inline-flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-5 py-2 text-sm font-medium text-text hover:border-accent"
      onClick={async () => {
        clearTimeout(timer.current);
        try {
          await navigator.clipboard.writeText(email); setStatus('copied');
          timer.current = setTimeout(() => setStatus('idle'), 2400);
        }
        catch { setStatus('error'); }
      }}>
      <span key={status} className="copy-feedback inline-flex items-center gap-2">
        {status === 'copied' ? <CheckIcon size={17} aria-hidden="true" /> : <CopyIcon size={17} aria-hidden="true" />}
        {status === 'copied' ? 'Copied' : 'Copy Email'}
      </span>
    </button>
    <p role="status" className="mt-2 min-h-4 text-xs text-muted">{status === 'copied' ? 'Email address copied.' : status === 'error' ? 'Select and copy the address below.' : ''}</p>
    {status === 'error' && <input aria-label="Email address to copy" readOnly value={email} onFocus={event => event.currentTarget.select()}
      className="mt-2 w-full rounded-lg border border-border bg-background p-2 text-sm text-text" />}
  </div>;
}
