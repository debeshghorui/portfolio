import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      aria-label={`${project.name} — ${project.tag}`}
      className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:p-5 interactive-card interactive-lift hover:border-accent/60 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-base font-semibold text-foreground text-pretty">
            {project.name}
          </h3>
          <span className="shrink-0 rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground">
            {project.tag}
          </span>
        </div>
        <ArrowRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-soft motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground text-pretty break-words">
        {project.description}
      </p>
      <div className="mt-1 font-mono-tight text-[11px] text-muted-foreground break-words">
        {project.stack.join(" · ")}
      </div>
    </Link>
  );
}
