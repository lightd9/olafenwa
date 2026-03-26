import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5",
        "font-mono text-[11px] font-normal tracking-wide",
        "bg-[#f0efeb] text-[--color-muted]",
        className,
      )}
    >
      {label}
    </span>
  );
}