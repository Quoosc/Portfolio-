import { ProjectScreenshot } from '@/components/sections/ProjectScreenshot';
import type { ProjectImage } from '@/data/projects';

export function ProjectPreview({ images, name }: { images: ProjectImage[]; name: string }) {
  if (images.length) return <ProjectScreenshot images={images} projectName={name} variant="compact" />;
  return <p className="rounded-xl border border-border bg-elevated p-8 text-center text-muted">Explore the live demo to see {name} in action.</p>;
}
