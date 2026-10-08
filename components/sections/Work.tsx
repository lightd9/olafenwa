import Image from "next/image";
import Link from "next/link";
import { Tag, SectionHeader } from "@/components/ui";
import type { Project } from "@/data/olafenwa";

interface WorkProps {
  projects: Project[];
}

export function Work({ projects }: WorkProps) {
  return (
    <section id="work" className="mb-20 scroll-mt-20">
      <SectionHeader title="Selected Work" />

      <div>
        {projects
          .filter((project) => !project.hidden)
          .map((project) => (
            <div
              key={project.slug}
              className="group relative border-t border-[--color-line] py-7"
            >
              <Link
                href={`/work/${project.slug}`}
                aria-label={`${project.title} — read more`}
                className="absolute inset-0"
              />

              {project.images?.[0] && (
                <div className="mb-5 overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-card)]">
                  <Image
                    src={project.images[0].src}
                    alt={`${project.title} screenshot`}
                    width={project.images[0].width}
                    height={project.images[0].height}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mb-2.5 flex items-start justify-between">
                <h3 className="work-title text-[15px] font-medium tracking-tight">
                  {project.title}
                </h3>
                {project.year && (
                  <span className="ml-4 shrink-0 font-mono text-[12px] text-[var(--color-muted)]">
                    {project.year}
                  </span>
                )}
              </div>

              <p className="mb-4 text-[14px] leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <div className="relative z-10 mt-4 flex gap-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo of ${project.title} (opens in new tab)`}
                    className="font-mono text-[12px] text-[var(--color-accent)] hover:underline"
                  >
                    Live ↗
                  </a>
                )}
                <Link
                  href={`/work/${project.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="font-mono text-[12px] text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                >
                  Read more{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
