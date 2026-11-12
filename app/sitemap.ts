import { siteConfig } from '@/lib/site-config';
import type { MetadataRoute } from 'next';

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/projects/cineon`, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
