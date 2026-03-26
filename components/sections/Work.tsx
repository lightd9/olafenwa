import { Tag, SectionHeader } from "@/components/ui";
import type { Project } from "@/data/olafenwa";

interface WorkProps {
  projects: Project[];
}

export function Work({ projects }: WorkProps) {
  return (
    <section id="work" className="mb-20">
      <SectionHeader title="Selected Work" />

      <div>
        {projects.map((project) => (
          <div key={project.title} className="group border-t border-[--color-line] py-7">
            <div className="mb-2.5 flex items-start justify-between">
              <h3 className="text-[15px] font-medium tracking-tight text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                {project.title}
              </h3>
              <span className="ml-4 shrink-0 font-mono text-[12px] text-[var(--color-muted)]">
                {project.year}
              </span>
            </div>

            <p className="mb-4 text-[14px] leading-relaxed text-[var(--color-muted)]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            {(project.url ?? project.repo) && (
              <div className="mt-4 flex gap-4">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-[var(--color-accent)] hover:underline">
                    Live ↗
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline">
                    Repo ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}