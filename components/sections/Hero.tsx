import { Badge } from "@/components/ui";
import type { PortfolioData } from "@/data/olafenwa";

interface HeroProps {
  data: Pick<PortfolioData, "name" | "role" | "bio" | "availableForWork" | "social">;
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="pb-24 pt-36">
      {data.availableForWork && (
        <Badge className="mb-7">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="font-mono text-[12px] text-[var(--color-accent)]">available for work</span>
        </Badge>
      )}

      <h1 className="mb-6 text-[clamp(36px,6vw,52px)] font-light leading-[1.1] tracking-tight text-[var(--color-ink)]">
        {data.name}
        <br />
        <span className="text-[var(--color-muted)]">{data.role}</span>
      </h1>

      <p className="max-w-[480px] text-[16px] font-light leading-relaxed text-[var(--color-muted)]">
        {data.bio}
      </p>

      <div className="mt-10 flex flex-wrap gap-5">
        {data.social.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="border-b border-[--color-line] pb-0.5 font-mono text-[13px] text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}