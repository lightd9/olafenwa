"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

interface NavProps {
  name: string;
  hashPrefix?: string;
}

const LABELS: Record<string, string> = {
  work: "Work",
  experience: "Experience",
  skills: "Stack",
  contact: "Contact",
};

export function Nav({ name, hashPrefix = "" }: NavProps) {
  const { active, scrolled } = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300 lg:hidden",
          scrolled || open
            ? "border-b border-[--color-line] bg-[rgba(247,246,243,0.9)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[760px] items-center justify-between px-7">
          <a
            href={hashPrefix ? `${hashPrefix}#top` : "#top"}
            className="font-mono text-[13px] text-[var(--color-ink)]"
            aria-label="Back to top"
          >
            {name.toLowerCase().replace("hassan", "")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-[1.5px] w-5 bg-[var(--color-ink)]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-[1.5px] w-5 bg-[var(--color-ink)]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-[1.5px] w-5 bg-[var(--color-ink)]"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--color-nav)] pt-14 lg:hidden"
          >
            <nav
              aria-label="Sections"
              className="mx-auto flex max-w-[760px] flex-col px-7 pt-8"
            >
              {SECTIONS.map((section, i) => (
                <motion.a
                  key={section}
                  href={`${hashPrefix}#${section}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: 0.06 * i }}
                  aria-current={active === section ? "true" : undefined}
                  className="flex items-baseline gap-4 border-b border-[var(--color-line)] py-5"
                >
                  <span className="font-mono text-[11px] text-[var(--color-muted)]">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[24px] font-light ${
                      active === section
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-ink)]"
                    }`}
                  >
                    {LABELS[section]}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
