import { skillCategories } from '@/data/skills';
import { FadeIn } from '@/components/ui/FadeIn';

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto flex max-w-6xl scroll-mt-16 items-center border-t border-border/60 px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="grid w-full items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
        <div>
          <FadeIn delay={0}>
            <span className="inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] uppercase tracking-wider text-accent">
              Skills
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
              Tools and concepts in my skill set.
            </h2>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
              A focused overview of the programming languages, frameworks, core concepts, and
              development tools listed in my current skill set.
            </p>
          </FadeIn>
        </div>

        <div>
          {skillCategories.map((category, index) => (
            <FadeIn key={category.label} delay={0.12 + index * 0.06} className="mb-4 last:mb-0">
              <h3 className="font-display text-xs uppercase tracking-wider text-muted">
                {category.label}
              </h3>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-3 text-center transition-colors duration-200 hover:border-accent/60"
                    >
                      {Icon && <Icon size={24} color="var(--color-accent)" aria-hidden="true" />}
                      <span className="text-xs text-text">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
