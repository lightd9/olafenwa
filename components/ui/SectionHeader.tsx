import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-center gap-4", className)}>
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-widest",
          "text-[var(--color-muted)]",
        )}
      >
        {title}
      </span>
      <div className="h-px flex-1 bg-[--color-line]" />
    </div>
  );
}