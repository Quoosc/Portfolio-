import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const title = 'Pham Tran Quoc — Software Engineering Student';
const description =
  'Pham Tran Quoc is a Software Engineering student at UIT, focused on full-stack development and exploring practical applications of Applied AI.';

export const metadata: Metadata = {
  metadataBase: new URL('https://quoc-portfolio-roan.vercel.app'),
  title,
  description,
  alternates: { canonical: '/' },
  applicationName: 'Pham Tran Quoc Portfolio',
  keywords: [
    'Pham Tran Quoc',
    'Software Engineering Student',
    'Full-stack Development',
    'Applied AI',
    'Cineon Movie Booking',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Pham Tran Quoc',
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pham Tran Quoc portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1 pt-[4.5rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
