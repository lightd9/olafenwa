"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavProps {
  name: string;
}

export function Nav({ name }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn("fixed left-0 right-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-[--color-line] bg-[rgba(247,246,243,0.9)] backdrop-blur-md" : "border-b border-transparent bg-transparent")}>
      <div className="mx-auto flex h-14 max-w-[760px] items-center justify-between px-7">
        <span className="font-mono text-[13px] text-[var(--color-ink)]">
          {name.toLowerCase().replace("hassan", "")}
        </span>
        <div className="flex gap-7">
          {["contact"].map((section) => (
            <a key={section} href={`#${section}`} className="text-[13px] text-[var(--color-ink)] hover:underline">
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}