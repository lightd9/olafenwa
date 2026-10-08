"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

interface SidebarProject {
  slug: string;
  title: string;
}

interface SidebarProps {
  name: string;
  social: { label: string; url: string }[];
  availableForWork: boolean;
  hashPrefix?: string;
  projects?: SidebarProject[];
  currentSlug?: string;
}

const LABELS: Record<string, string> = {
  work: "Work",
  experience: "Experience",
  skills: "Stack",
  contact: "Contact",
};

const EASE = "cubic-bezier(0.34, 1.45, 0.64, 1)";
const EXPANDED_W = 288;
const COLLAPSED_W = 56;

export function Sidebar({
  name,
  social,
  availableForWork,
  hashPrefix = "",
  projects,
  currentSlug,
}: SidebarProps) {
  const { active } = useActiveSection();
  const caseMode = Boolean(projects && currentSlug);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--sidebar-w",
      collapsed ? `${COLLAPSED_W}px` : `${EXPANDED_W}px`,
    );
    return () => root.style.setProperty("--sidebar-w", `${EXPANDED_W}px`);
  }, [collapsed]);

  const toggle = () => setCollapsed((value) => !value);

  const toggleButton = (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={!collapsed}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className="sidebar-collapse fixed top-9 z-50 hidden h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ink)] text-white shadow-md transition-opacity duration-200 hover:opacity-80 lg:flex"
      style={{
        right: (collapsed ? COLLAPSED_W : EXPANDED_W) + 12,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500"
        style={{
          transform: collapsed ? "rotate(180deg)" : "none",
          transitionTimingFunction: EASE,
        }}
      >
        <path
          d="M10 3L5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  const contentProps = {
    animate: {
      opacity: collapsed ? 0 : 1,
      x: collapsed ? -12 : 0,
      pointerEvents: collapsed ? "none" : "auto",
    },
    transition: { duration: 0.15 },
  };

  const socials = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: caseMode ? 0.55 : 0.45 }}
      className="flex flex-col gap-4"
    >
      {availableForWork && (
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="font-mono text-[11px] text-[var(--color-muted)]">
            available for work
          </span>
        </div>
      )}
      <div className="flex flex-row items-center gap-4">
        {social
          .filter((link) => link.label !== "Resume")
          .map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="w-fit font-mono text-[12px] text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              {link.label} ↗
            </a>
          ))}
      </div>
    </motion.div>
  );

  if (caseMode && projects && currentSlug) {
    return (
      <>
        {toggleButton}
        <aside
          key={currentSlug}
          className="sidebar-collapse fixed right-0 top-0 z-40 hidden h-screen overflow-hidden border-l border-[var(--color-line)] bg-[var(--color-nav)] lg:flex lg:flex-col"
          style={{ width: collapsed ? COLLAPSED_W : EXPANDED_W }}
        >
          <motion.div
            {...contentProps}
            className="flex w-[288px] min-h-0 flex-1 flex-col px-8 py-9"
          >
            <div>
              <motion.a
                href={`${hashPrefix}#top`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[13px] text-[var(--color-ink)]"
                aria-label="Back to top"
              >
                {name.toLowerCase().replace("hassan", "")}
              </motion.a>

              <nav aria-label="Sections" className="mt-5">
                <ul className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1">
                  {SECTIONS.map((section, i) => {
                    const isActive = section === "work";
                    return (
                      <motion.li
                        key={section}
                        initial={{ opacity: 0, x: -14, y: 18 * (i + 1) }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                          delay: 0.08 + i * 0.06,
                        }}
                      >
                        <a
                          href={`${hashPrefix}#${section}`}
                          aria-current={isActive ? "true" : undefined}
                          className="font-mono text-[11px] text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                        >
                          {LABELS[section]}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <nav
              aria-label="Works"
              className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden py-6"
            >
              <ul className="flex flex-col gap-1">
                {projects.map((project, i) => {
                  const isCurrent = project.slug === currentSlug;
                  return (
                    <motion.li
                      key={project.slug}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                    >
                      <a
                        href={`/work/${project.slug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className="group relative flex items-baseline gap-4 rounded-md py-1 pl-4 pr-2 transition-colors duration-300 hover:bg-[var(--color-card)]"
                      >
                        {isCurrent && (
                          <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-[var(--color-accent)]" />
                        )}
                        <span
                          className={`text-[15px] transition-all duration-300 group-hover:translate-x-1.5 ${
                            isCurrent
                              ? "font-medium text-[var(--color-ink)]"
                              : "text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
                          }`}
                        >
                          {project.title}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {socials}
          </motion.div>
        </aside>
      </>
    );
  }

  return (
    <>
      {toggleButton}
      <aside
        className="sidebar-collapse fixed right-0 top-0 z-40 hidden h-screen overflow-hidden border-l border-[var(--color-line)] bg-[var(--color-nav)] lg:flex lg:flex-col"
        style={{ width: collapsed ? COLLAPSED_W : EXPANDED_W }}
      >
        <motion.div
          {...contentProps}
          className="flex w-[288px] flex-1 flex-col justify-between px-8 py-9"
        >
          <div>
            <motion.a
              href={hashPrefix ? `${hashPrefix}#top` : "#top"}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[13px] text-[var(--color-ink)]"
              aria-label="Back to top"
            >
              {name.toLowerCase().replace("hassan", "")}
            </motion.a>
          </div>

          <nav aria-label="Sections">
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((section, i) => {
                const isActive = active === section;
                return (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                  >
                    <a
                      href={`${hashPrefix}#${section}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group relative flex items-baseline gap-4 rounded-md py-2.5 pl-4 pr-2 transition-colors duration-300 hover:bg-[var(--color-card)]"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-[var(--color-accent)]"
                        />
                      )}
                      <span
                        className={`font-mono text-[11px] transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-muted)]"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`text-[15px] transition-all duration-300 group-hover:translate-x-1.5 ${
                          isActive
                            ? "font-medium text-[var(--color-ink)]"
                            : "text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {LABELS[section]}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {socials}
        </motion.div>
      </aside>
    </>
  );
}
