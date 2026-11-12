'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ScreenshotImage({ src, alt, sizes, className = '' }: {
  src: string; alt: string; sizes: string; className?: string;
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  if (status === 'error') return (
    <div role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-muted">
      This screenshot could not load. Please try again later.
    </div>
  );
  return (
    <>
      {status === 'loading' && <span aria-hidden="true" className="absolute inset-0 bg-elevated" />}
      <Image src={src} alt={alt} fill sizes={sizes} className={className}
        onLoad={() => setStatus('ready')} onError={() => setStatus('error')} />
    </>
  );
}
