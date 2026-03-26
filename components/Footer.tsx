interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[--color-line] py-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12px] text-[var(--color-muted)]">
          © {year} {name}
        </span>
        <span className="font-mono text-[12px] text-[var(--color-muted)]">
          XO♥
        </span>
      </div>
    </footer>
  );
}