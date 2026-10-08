"use client";

import { useEffect, useState } from "react";

export const SECTIONS = ["work", "experience", "skills", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

function isSectionId(value: string): value is SectionId {
  return (SECTIONS as readonly string[]).includes(value);
}

function computeActive(): SectionId | null {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // At the very end of the page the trailing sections can't reach the
  // marker on tall viewports — the last visible section owns the bottom.
  if (window.scrollY >= maxScroll - 8) {
    let lastVisible: SectionId | null = null;
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight) {
        lastVisible = id;
      }
    }
    if (lastVisible) return lastVisible;
  }

  const marker = window.scrollY + Math.round(window.innerHeight * 0.45);
  let current: SectionId | null = null;
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= marker) current = id;
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
    const initialHash = window.location.hash.slice(1);
    if (isSectionId(initialHash)) override = initialHash;

    const apply = () => setActive(override ?? computeActive());

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
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
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchmove", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    window.addEventListener("pointerdown", onUserInput);

    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchmove", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.removeEventListener("pointerdown", onUserInput);
    };
  }, []);

  return { active, scrolled };
}
