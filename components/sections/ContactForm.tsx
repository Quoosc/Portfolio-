'use client';

import { useActionState } from 'react';
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';

const initialState: ContactFormState = { status: 'idle', message: '' };

const fieldClasses =
  'mt-2 w-full rounded-lg border border-border/60 bg-surface/60 px-4 py-3 text-base text-text backdrop-blur-md transition-colors placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="font-display text-xs uppercase tracking-wider text-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-display text-xs uppercase tracking-wider text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClasses}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-display text-xs uppercase tracking-wider text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${fieldClasses} resize-none`}
          placeholder="What's on your mind?"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Sending…' : 'Send Message'}
        </Button>

        {state.status === 'success' && (
          <p role="status" className="text-sm text-accent">
            {state.message}
          </p>
        )}
        {state.status === 'error' && (
          <p role="alert" className="text-sm text-danger">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
