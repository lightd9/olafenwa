import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1",
        "border border-[#c7d9ff] bg-[#edf3ff]",
        className,
      )}
    >
      {children}
    </div>
  );
}