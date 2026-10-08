import { SectionHeader } from "@/components/ui";

interface ContactProps {
  email: string;
  twitter: string;
}

export function Contact({ email, twitter }: ContactProps) {
  return (
    <section id="contact" className="mb-20 scroll-mt-20">
      <SectionHeader title="Contact" />

      <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] p-9">
        <p className="mb-5 text-[14px] leading-relaxed text-[var(--color-muted)]">
          I'm open to collaborating on fun projects. Full-time role, a contract,
          or a late-night side project. Drop me a line.
        </p>
        <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={`mailto:${email}`}
            className="font-mono text-[14px] text-[var(--color-accent)] hover:underline"
          >
            {email} ↗
          </a>
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter profile (opens in new tab)"
            className="font-mono text-[14px] text-[var(--color-accent)] hover:underline"
          >
            Twitter ↗
          </a>
        </div>
      </div>
    </section>
  );
}
