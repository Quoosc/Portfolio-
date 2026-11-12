import { siteConfig } from '@/lib/site-config';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Person', name: siteConfig.name,
        url: siteConfig.url, jobTitle: siteConfig.profile.role,
        sameAs: [siteConfig.socialLinks.github],
      }).replace(/</g, '\\u003c') }} />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
