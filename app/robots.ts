import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://quoc-portfolio-roan.vercel.app/sitemap.xml',
  };
}
