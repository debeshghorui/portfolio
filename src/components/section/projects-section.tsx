import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { Section } from "@/components/section/section";
import { useIconAnimation } from "@/hooks/use-icon-animation";
import { projects, sections } from "@/data";

function ProjectCard({ project: p }: { project: (typeof projects)[number] }) {
    const { ref, triggers } = useIconAnimation();

    return (
        <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} — ${p.tag} project (opens in new tab)`}
            {...triggers}
            className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                    <span className="text-base font-semibold text-foreground">
                        {p.name}
                    </span>
                    <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight text-[10px] uppercase tracking-wide text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-foreground">
                        {p.tag}
                    </span>
                </div>
                <ArrowUpRightIcon
                    ref={ref}
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none flex shrink-0 text-muted-foreground transition-colors group-hover:text-accent group-focus-visible:text-accent"
                />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
                {p.description}
            </p>
            <div className="mt-1 font-mono-tight text-[11px] text-muted-foreground">
                {p.stack.join(" · ")}
            </div>
        </a>
    );
}

export function ProjectsSection() {
    return (
        <Section
            id={sections.projects.id}
            title={sections.projects.title}
            subtitle={sections.projects.subtitle}
        >
            <div className="grid gap-3 sm:grid-cols-2">
                {projects.map((p) => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>
        </Section>
    );
}
