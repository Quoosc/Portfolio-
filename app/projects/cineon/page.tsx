import type { Metadata } from 'next';
import { CineonCaseStudy } from '@/components/projects/CineonCaseStudy';

const title = 'Cineon — Movie Booking Web | Pham Tran Quoc';
const description =
  'A case study of Cineon, a full-stack movie booking application built with ReactJS, Laravel, RESTful APIs, and MySQL.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects/cineon' },
  openGraph: {
    title,
    description,
    type: 'article',
    url: '/projects/cineon',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Cineon case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
};

export default function CineonPage() {
  return <CineonCaseStudy />;
}
