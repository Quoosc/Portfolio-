import type { Metadata } from 'next';
import { Fira_Code, Share_Tech_Mono } from 'next/font/google';
import { CursorGlow } from '@/components/effects/CursorGlow';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech-mono',
  weight: '400',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

const title = 'Pham Tran Quoc | Software Engineering Student';
const description =
  'Portfolio of Pham Tran Quoc, a Software Engineering student focused on full-stack development and interested in Applied AI.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Pham Tran Quoc',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
      className={`${shareTechMono.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CursorGlow />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
