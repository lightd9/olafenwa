import { SectionHeader } from "@/components/ui";

interface ContactProps {
  email: string;
}

export function Contact({ email }: ContactProps) {
  return (
    <section id="contact" className="mb-20">
      <SectionHeader title="Contact" />

      <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-9">
        <p className="mb-5 text-[14px] leading-relaxed text-[var(--color-muted)]">
          Open to interesting problems. Full-time role, a contract, or a late-night side project. Drop me a line.
        </p>
        <div className="flex flex-col gap-2">
          <a href={`mailto:${email}`} className="font-mono text-[14px] text-[var(--color-accent)] hover:underline">
            {email} ↗
          </a>
          <a href="https://x.com/ol4fenwa/" className="font-mono text-[14px] text-[var(--color-accent)] hover:underline">
            Twitter ↗
          </a>
        </div>
      </div>
    </section>
  );
}
