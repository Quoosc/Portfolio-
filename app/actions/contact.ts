'use server';

import { Resend } from 'resend';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in every field.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: 'error', message: 'That email address doesn’t look right.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !to) {
    return {
      status: 'error',
      message: 'Contact form isn’t configured yet — email me directly instead.',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return { status: 'error', message: 'Message failed to send. Please try again.' };
    }

    return { status: 'success', message: 'Message sent — I’ll get back to you soon.' };
  } catch {
    return { status: 'error', message: 'Message failed to send. Please try again.' };
  }
}
