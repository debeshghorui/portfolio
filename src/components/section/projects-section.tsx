import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { projects, sections } from "@/data";

export function ProjectsSection() {
  return (
    <Section
      id={sections.projects.id}
      title={sections.projects.title}
      subtitle={sections.projects.subtitle}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} — ${p.tag} project (opens in new tab)`}
            className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-base font-semibold text-foreground">
                  {p.name}
                </span>
                <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <div className="mt-1 font-mono-tight text-[11px] text-muted-foreground">
              {p.stack.join(" · ")}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
