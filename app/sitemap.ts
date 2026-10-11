import type { MetadataRoute } from 'next';

const baseUrl = 'https://quoc-portfolio-roan.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/projects/cineon`, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
