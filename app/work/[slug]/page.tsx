import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Sidebar, Footer } from "@/components";
import { Reveal } from "@/components/Reveal";
import { Slideshow } from "@/components/Slideshow";
import { Tag } from "@/components/ui";
import { portfolio } from "@/data/olafenwa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = portfolio.projects.indexOf(project);
  const next =
    portfolio.projects[(index + 1) % portfolio.projects.length] ?? project;

  return (
    <>
      <Nav name={portfolio.name} hashPrefix="/" />
      <Sidebar
        name={portfolio.name}
        social={portfolio.social}
        availableForWork={portfolio.availableForWork}
        hashPrefix="/"
        projects={portfolio.projects}
        currentSlug={project.slug}
      />
      <div className="sidebar-pad">
        <main id="main" className="mx-auto max-w-[760px] px-7">
          <article className="pb-24 pt-36">
            <Reveal>
              <Link
                href="/#work"
                className="font-mono text-[13px] text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                ← All work
              </Link>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                {project.year && (
                  <span className="font-mono text-[12px] text-[var(--color-muted)]">
                    {project.year}
                  </span>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>

              <h1 className="mt-5 text-[clamp(32px,5vw,44px)] font-light leading-[1.1] tracking-tight text-[var(--color-ink)]">
                {project.title}
              </h1>

              <p className="mt-6 max-w-[560px] text-[16px] font-light leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>

              {(project.url ?? project.repo) && (
                <div className="mt-7 flex gap-4">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 font-mono text-[13px] text-white transition-opacity duration-200 hover:opacity-90"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} repository (opens in new tab)`}
                      className="rounded-full border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-2.5 font-mono text-[13px] text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      View Repo ↗
                    </a>
                  )}
                </div>
              )}
            </Reveal>

            {project.images && project.images.length > 0 && (
              <Reveal className="mt-12">
                <Slideshow images={project.images} alt={project.title} />
              </Reveal>
            )}

            {project.details && project.details.length > 0 && (
              <Reveal className="mt-12">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
                  Highlights
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-[14px] leading-relaxed text-[var(--color-ink)]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal className="mt-16">
              <Link
                href={`/work/${next.slug}`}
                className="group flex items-baseline justify-between border-t border-[var(--color-line)] py-7"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
                    Next project
                  </span>
                  <p className="mt-2 text-[17px] font-medium tracking-tight text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                    {next.title}
                  </p>
                </div>
                <span className="font-mono text-[14px] text-[var(--color-muted)] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--color-accent)]">
                  →
                </span>
              </Link>
            </Reveal>

            <Footer name={portfolio.name} />
          </article>
        </main>
      </div>
    </>
  );
}
