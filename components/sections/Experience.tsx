import { SectionHeader } from "@/components/ui";
import type { Experience as ExperienceType } from "@/data/olafenwa";

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="mb-20">
      <SectionHeader title="Experience" />

      <div>
        {experience.map((item) => (
          <div key={`${item.company}-${item.period}`} className="grid grid-cols-[1fr_auto] items-start border-t border-[--color-line] py-5">
            <div>
              <p className="mb-1 text-[15px] font-medium text-[var(--color-ink)]">
                {item.role}
              </p>
              <p className="text-[13px] text-[var(--color-muted)]">
                {item.company} · {item.description}
              </p>
            </div>
            <span className="ml-5 shrink-0 font-mono text-[12px] text-[var(--color-muted)]">
              {item.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}