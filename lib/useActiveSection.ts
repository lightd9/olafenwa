"use client";

import { useEffect, useState } from "react";

export const SECTIONS = ["work", "experience", "skills", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

function isSectionId(value: string): value is SectionId {
  return (SECTIONS as readonly string[]).includes(value);
}

function isNearTop(id: SectionId, threshold: number): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  return el.getBoundingClientRect().top <= threshold;
}

function computeActive(): SectionId | null {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight > window.innerHeight + 8;
  const atBottom =
    scrollable && window.scrollY + window.innerHeight >= doc.scrollHeight - 8;

  // The trailing section owns the end of the page even when a tall
  // viewport keeps its top below the marker line.
  if (atBottom) {
    const last = SECTIONS[SECTIONS.length - 1];
    if (last && isNearTop(last, window.innerHeight)) return last;
  }

  const markerY = window.innerHeight * 0.45;
  let current: SectionId | null = null;
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= markerY) current = id;
  }
  return current;
}

interface ActiveSectionState {
  active: SectionId | null;
  scrolled: boolean;
}

export function useActiveSection(): ActiveSectionState {
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let override: SectionId | null = null;

    // Honor a hash only if the page actually landed near that section.
    // History back/forward can restore a stale hash from a previous route.
    const initialHash = window.location.hash.slice(1);
    if (
      isSectionId(initialHash) &&
      isNearTop(initialHash, window.innerHeight * 0.6)
    ) {
      override = initialHash;
    }

    const apply = () => setActive(override ?? computeActive());

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      apply();
    };

    const onResize = () => {
      apply();
    };

    // Smooth scrolling fires scroll events, so nav clicks are pinned via
    // hashchange and released only on real user input.
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      override = isSectionId(id) ? id : null;
      apply();
    };

    const onUserInput = () => {
      override = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchmove", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    window.addEventListener("pointerdown", onUserInput);

    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchmove", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.removeEventListener("pointerdown", onUserInput);
    };
  }, []);

  return { active, scrolled };
}
