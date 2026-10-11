import { FadeIn } from '@/components/ui/FadeIn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnologyBadge } from '@/components/ui/TechnologyBadge';
import { skillCategories } from '@/data/skills';

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border/80 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="Technical skills"
            title="Tools and fundamentals I work with."
            description="A focused overview of the languages, frameworks, engineering concepts, and development tools in my current skill set."
          />
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.label} delay={index * 0.04}>
              <article className="h-full rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="text-base font-semibold text-text">{category.label}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <TechnologyBadge key={skill.name} {...skill} />
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
