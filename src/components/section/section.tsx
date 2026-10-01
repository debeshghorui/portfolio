import { useId } from "react";

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const headingId = useId();
  return (
    <section id={id} aria-labelledby={headingId} className="mt-16 scroll-mt-24">
      <div className="mb-5">
        <h2
          id={headingId}
          className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-pretty text-foreground/80">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
